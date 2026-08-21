import { type HotkeyStore, createHotkeyStore } from '@zag-js/hotkeys'
import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { useHotkey } from './use-hotkey.ts'
import { useHotkeyRecorder } from './use-hotkey-recorder.ts'
import { useHotkeyRegistrations } from './use-hotkey-registrations.ts'
import { useHotkeys } from './use-hotkeys.ts'

describe('enableOnFormTags', () => {
  const Form = ({ onPlain, onModifier, onOptIn }: Record<string, () => void>) => {
    useHotkeys({
      commands: [
        { id: 'plain', hotkey: 's', action: onPlain },
        { id: 'modifier', hotkey: 'ctrl+s', action: onModifier },
        { id: 'optin', hotkey: 'p', action: onOptIn, options: { enableOnFormTags: true } },
      ],
    })
    return <input aria-label="note" />
  }

  it('should ignore a single-key hotkey while typing in an input', async () => {
    const onPlain = vi.fn()

    render(<Form onPlain={onPlain} onModifier={vi.fn()} onOptIn={vi.fn()} />)

    await user.click(screen.getByLabelText('note'))
    await user.keyboard('s')

    expect(screen.getByLabelText('note')).toHaveValue('s')
    expect(onPlain).not.toHaveBeenCalled()
  })

  it('should still fire a modifier hotkey while typing in an input', async () => {
    const onModifier = vi.fn()

    render(<Form onPlain={vi.fn()} onModifier={onModifier} onOptIn={vi.fn()} />)

    await user.click(screen.getByLabelText('note'))
    await user.keyboard('{Control>}s{/Control}')

    await waitFor(() => expect(onModifier).toHaveBeenCalledTimes(1))
  })

  it('should fire a single-key hotkey in an input when opted in', async () => {
    const onOptIn = vi.fn()

    render(<Form onPlain={vi.fn()} onModifier={vi.fn()} onOptIn={onOptIn} />)

    await user.click(screen.getByLabelText('note'))
    await user.keyboard('p')

    await waitFor(() => expect(onOptIn).toHaveBeenCalledTimes(1))
  })

  it('should fire a single-key hotkey outside a form field', async () => {
    const onPlain = vi.fn()

    render(<Form onPlain={onPlain} onModifier={vi.fn()} onOptIn={vi.fn()} />)

    await user.keyboard('s')

    await waitFor(() => expect(onPlain).toHaveBeenCalledTimes(1))
  })
})

describe('sequenceTimeoutMs', () => {
  const Comp = ({ onFire, store }: { onFire: () => void; store: HotkeyStore }) => {
    useHotkey({ hotkey: 'G > H', action: onFire, store })
    return <div>ready</div>
  }

  it('should fire when the steps land inside the window', async () => {
    const onFire = vi.fn()

    render(<Comp onFire={onFire} store={createHotkeyStore({ sequenceTimeoutMs: 300 })} />)

    await user.keyboard('g')
    await user.keyboard('h')

    await waitFor(() => expect(onFire).toHaveBeenCalledTimes(1))
  })

  it('should not fire when the second step arrives after the window', async () => {
    const onFire = vi.fn()

    render(<Comp onFire={onFire} store={createHotkeyStore({ sequenceTimeoutMs: 120 })} />)

    await user.keyboard('g')
    await new Promise((resolve) => setTimeout(resolve, 300))
    await user.keyboard('h')

    expect(onFire).not.toHaveBeenCalled()
  })
})

describe('conflictBehavior', () => {
  const Two = ({ store }: { store: HotkeyStore }) => {
    useHotkeys({
      commands: [
        { id: 'first', hotkey: 'ctrl+k', action: vi.fn(), label: 'First' },
        { id: 'second', hotkey: 'ctrl+k', action: vi.fn(), label: 'Second' },
      ],
      store,
    })
    const commands = useHotkeyRegistrations({ store })
    return <span data-testid="ids">{commands.map((command) => command.id).join(',') || 'none'}</span>
  }

  it('should keep both registrations when allowed', async () => {
    render(<Two store={createHotkeyStore({ conflictBehavior: 'allow' })} />)

    await waitFor(() => expect(screen.getByTestId('ids')).toHaveTextContent('first,second'))
  })

  it('should drop the earlier registration when replacing', async () => {
    render(<Two store={createHotkeyStore({ conflictBehavior: 'replace' })} />)

    await waitFor(() => expect(screen.getByTestId('ids')).toHaveTextContent('second'))
    expect(screen.getByTestId('ids')).not.toHaveTextContent('first')
  })

  it('should warn but keep both by default', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    render(<Two store={createHotkeyStore()} />)

    await waitFor(() => expect(screen.getByTestId('ids')).toHaveTextContent('first,second'))
    expect(warn).toHaveBeenCalled()

    warn.mockRestore()
  })
})

describe('recorder cancel and clear', () => {
  const Comp = ({ onCancel, onClear }: { onCancel?: () => void; onClear?: () => void }) => {
    const recorder = useHotkeyRecorder({ onCancel, onClear })
    return (
      <div>
        <button type="button" onClick={() => recorder.start()}>
          record
        </button>
        <span data-testid="state">{recorder.recording ? 'recording' : 'idle'}</span>
        <span data-testid="value">{recorder.value?.display ?? 'empty'}</span>
      </div>
    )
  }

  it('should cancel recording on Escape', async () => {
    const onCancel = vi.fn()
    const session = user.setup()

    render(<Comp onCancel={onCancel} />)

    await session.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.getByTestId('state')).toHaveTextContent('recording'))

    await session.keyboard('{Escape}')

    await waitFor(() => expect(onCancel).toHaveBeenCalledTimes(1))
    expect(screen.getByTestId('state')).toHaveTextContent('idle')
  })

  it('should clear the recorded value on Backspace', async () => {
    const onClear = vi.fn()
    const session = user.setup()

    render(<Comp onClear={onClear} />)

    await session.click(screen.getByRole('button'))
    await session.keyboard('{Control>}k{/Control}')
    await waitFor(() => expect(screen.getByTestId('value')).not.toHaveTextContent('empty'))

    await session.keyboard('{Backspace}')

    await waitFor(() => expect(onClear).toHaveBeenCalledTimes(1))
    expect(screen.getByTestId('value')).toHaveTextContent('empty')
  })
})
