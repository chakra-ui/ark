import { render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { For, Show, createSignal } from 'solid-js'
import { HotkeysProvider } from './hotkeys-provider.tsx'
import { useFormatHotkey } from './use-format-hotkey.ts'
import { useHotkey } from './use-hotkey.ts'
import { useHotkeyRegistrations } from './use-hotkey-registrations.ts'
import { useHotkeyStore } from './use-hotkey-store.ts'
import { useHotkeys } from './use-hotkeys.ts'
import { useIsKeyPressed } from './use-is-key-pressed.ts'
import { usePlatform } from './use-platform.ts'
import { usePressedKeys } from './use-pressed-keys.ts'

describe('useHotkey', () => {
  it('should invoke the action when the hotkey is pressed', async () => {
    const onAction = vi.fn()

    const Comp = () => {
      useHotkey('ctrl+k', onAction)
      return <div>ready</div>
    }

    render(() => (
      <HotkeysProvider>
        <Comp />
      </HotkeysProvider>
    ))

    await user.keyboard('{Control>}k{/Control}')
    await waitFor(() => expect(onAction).toHaveBeenCalledTimes(1))
  })

  it('should not invoke the action after unmount', async () => {
    const onAction = vi.fn()

    const Comp = () => {
      useHotkey('ctrl+k', onAction)
      return <div>ready</div>
    }

    const { unmount } = render(() => (
      <HotkeysProvider>
        <Comp />
      </HotkeysProvider>
    ))
    unmount()

    await user.keyboard('{Control>}k{/Control}')
    expect(onAction).not.toHaveBeenCalled()
  })

  it('should read the latest reactive value in the action', async () => {
    const calls: number[] = []
    const [value, setValue] = createSignal(1)

    const Comp = () => {
      useHotkey('ctrl+k', () => calls.push(value()))
      return <div>{value()}</div>
    }

    render(() => (
      <HotkeysProvider>
        <Comp />
      </HotkeysProvider>
    ))

    setValue(2)
    await user.keyboard('{Control>}k{/Control}')

    await waitFor(() => expect(calls).toEqual([2]))
  })

  it('should respect a reactive enabled option', async () => {
    const onAction = vi.fn()
    const [enabled, setEnabled] = createSignal(false)

    const Comp = () => {
      useHotkey('ctrl+k', onAction, () => ({ enabled: enabled() }))
      return <div>ready</div>
    }

    render(() => (
      <HotkeysProvider>
        <Comp />
      </HotkeysProvider>
    ))

    await user.keyboard('{Control>}k{/Control}')
    expect(onAction).not.toHaveBeenCalled()

    setEnabled(true)
    await user.keyboard('{Control>}k{/Control}')
    await waitFor(() => expect(onAction).toHaveBeenCalledTimes(1))
  })
})

describe('useHotkeys', () => {
  it('should register multiple hotkeys', async () => {
    const onSave = vi.fn()
    const onUndo = vi.fn()

    const Comp = () => {
      useHotkeys([
        { id: 'save', hotkey: 'ctrl+s', action: onSave },
        { id: 'undo', hotkey: 'ctrl+z', action: onUndo },
      ])
      return <div>ready</div>
    }

    render(() => (
      <HotkeysProvider>
        <Comp />
      </HotkeysProvider>
    ))

    await user.keyboard('{Control>}s{/Control}')
    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1))

    await user.keyboard('{Control>}z{/Control}')
    await waitFor(() => expect(onUndo).toHaveBeenCalledTimes(1))
  })

  it('should react to an accessor of commands', async () => {
    const [extra, setExtra] = createSignal(false)

    const Comp = () => {
      useHotkeys(() => [
        { id: 'save', hotkey: 'ctrl+s', action: vi.fn() },
        ...(extra() ? [{ id: 'undo', hotkey: 'ctrl+z', action: vi.fn() }] : []),
      ])
      const commands = useHotkeyRegistrations()
      return <span data-testid="count">{commands().length}</span>
    }

    render(() => (
      <HotkeysProvider>
        <Comp />
      </HotkeysProvider>
    ))

    await waitFor(() => expect(screen.getByTestId('count')).toHaveTextContent('1'))

    setExtra(true)
    await waitFor(() => expect(screen.getByTestId('count')).toHaveTextContent('2'))

    setExtra(false)
    await waitFor(() => expect(screen.getByTestId('count')).toHaveTextContent('1'))
  })
})

describe('useHotkeyRegistrations', () => {
  it('should expose registered commands with their metadata', async () => {
    const Comp = () => {
      useHotkeys([
        { id: 'save', hotkey: 'ctrl+s', action: vi.fn(), label: 'Save file', category: 'File' },
        { id: 'undo', hotkey: 'ctrl+z', action: vi.fn(), label: 'Undo', category: 'Edit' },
      ])
      const commands = useHotkeyRegistrations()
      return (
        <ul>
          <For each={commands()}>
            {(command) => <li>{`${command.label} — ${command.hotkey} (${command.category})`}</li>}
          </For>
        </ul>
      )
    }

    render(() => (
      <HotkeysProvider>
        <Comp />
      </HotkeysProvider>
    ))

    expect(await screen.findByText('Save file — ctrl+s (File)')).toBeInTheDocument()
    expect(await screen.findByText('Undo — ctrl+z (Edit)')).toBeInTheDocument()
  })

  it('should update when a command unregisters', async () => {
    const [show, setShow] = createSignal(true)

    const Child = () => {
      useHotkey('ctrl+s', vi.fn(), { label: 'Save file' })
      return null
    }

    const Comp = () => {
      const commands = useHotkeyRegistrations()
      return (
        <div>
          <Show when={show()}>
            <Child />
          </Show>
          <span data-testid="count">{commands().length}</span>
        </div>
      )
    }

    render(() => (
      <HotkeysProvider>
        <Comp />
      </HotkeysProvider>
    ))

    await waitFor(() => expect(screen.getByTestId('count')).toHaveTextContent('1'))

    setShow(false)
    await waitFor(() => expect(screen.getByTestId('count')).toHaveTextContent('0'))
  })
})

describe('key state', () => {
  it('should track whether a key is pressed', async () => {
    const Comp = () => {
      useHotkey('ctrl+k', vi.fn())
      const shift = useIsKeyPressed('shift')
      return <span data-testid="shift">{String(shift())}</span>
    }

    render(() => (
      <HotkeysProvider>
        <Comp />
      </HotkeysProvider>
    ))

    expect(screen.getByTestId('shift')).toHaveTextContent('false')

    const session = user.setup()
    await session.keyboard('{Shift>}')
    await waitFor(() => expect(screen.getByTestId('shift')).toHaveTextContent('true'))

    await session.keyboard('{/Shift}')
    await waitFor(() => expect(screen.getByTestId('shift')).toHaveTextContent('false'))
  })

  it('should expose currently pressed keys', async () => {
    const Comp = () => {
      useHotkey('ctrl+k', vi.fn())
      const keys = usePressedKeys()
      return <span data-testid="keys">{keys().join('+') || 'none'}</span>
    }

    render(() => (
      <HotkeysProvider>
        <Comp />
      </HotkeysProvider>
    ))

    const session = user.setup()
    await session.keyboard('{Shift>}')
    await waitFor(() => expect(screen.getByTestId('keys')).toHaveTextContent('Shift'))

    await session.keyboard('{/Shift}')
    await waitFor(() => expect(screen.getByTestId('keys')).toHaveTextContent('none'))
  })
})

describe('scopes', () => {
  it('should only fire commands within an active scope', async () => {
    const onEditor = vi.fn()
    const onGlobal = vi.fn()

    const Comp = () => {
      useHotkeys([
        { id: 'editor', hotkey: 'ctrl+b', action: onEditor, scopes: ['editor'] },
        { id: 'global', hotkey: 'ctrl+g', action: onGlobal },
      ])
      return <div>ready</div>
    }

    render(() => (
      <HotkeysProvider activeScopes={['reader']}>
        <Comp />
      </HotkeysProvider>
    ))

    await user.keyboard('{Control>}b{/Control}')
    expect(onEditor).not.toHaveBeenCalled()

    await user.keyboard('{Control>}g{/Control}')
    await waitFor(() => expect(onGlobal).toHaveBeenCalledTimes(1))
  })
})

describe('platform', () => {
  it('should format hotkeys for the detected platform', async () => {
    const Comp = () => {
      const formatHotkey = useFormatHotkey()
      const platform = usePlatform()
      return <span data-testid="out">{`${platform()}:${formatHotkey('mod+K')}`}</span>
    }

    render(() => (
      <HotkeysProvider>
        <Comp />
      </HotkeysProvider>
    ))

    await waitFor(() => {
      const text = screen.getByTestId('out').textContent ?? ''
      const [platform, formatted] = text.split(':')
      expect(platform).toMatch(/^(mac|windows|linux)$/)
      expect(formatted).toContain('K')
    })
  })
})

describe('registration reconciliation', () => {
  it('should not re-register commands that did not change', async () => {
    const [label, setLabel] = createSignal('Undo')
    let store!: ReturnType<typeof useHotkeyStore>

    const Comp = () => {
      store = useHotkeyStore()
      useHotkeys(() => [
        { id: 'save', hotkey: 'ctrl+s', action: vi.fn(), label: 'Save' },
        { id: 'undo', hotkey: 'ctrl+z', action: vi.fn(), label: label() },
      ])
      const commands = useHotkeyRegistrations()
      return <span data-testid="count">{commands().length}</span>
    }

    render(() => (
      <HotkeysProvider>
        <Comp />
      </HotkeysProvider>
    ))

    await waitFor(() => expect(screen.getByTestId('count')).toHaveTextContent('2'))

    const order = (id: string) => store.getState().commands.get(id)?._registrationOrder
    const beforeSave = order('save')
    const beforeUndo = order('undo')

    setLabel('Undo edit')
    await waitFor(() => expect(store.getState().commands.get('undo')?.label).toBe('Undo edit'))

    expect(order('save')).toBe(beforeSave)
    expect(order('undo')).not.toBe(beforeUndo)
  })

  it('should treat equivalent hotkey spellings as unchanged', async () => {
    const [hotkey, setHotkey] = createSignal('ctrl+k')
    let store!: ReturnType<typeof useHotkeyStore>

    const Comp = () => {
      store = useHotkeyStore()
      useHotkeys(() => [{ id: 'save', hotkey: hotkey(), action: vi.fn() }])
      return <span data-testid="hotkey">{hotkey()}</span>
    }

    render(() => (
      <HotkeysProvider>
        <Comp />
      </HotkeysProvider>
    ))

    await waitFor(() => expect(screen.getByTestId('hotkey')).toHaveTextContent('ctrl+k'))
    const before = store.getState().commands.get('save')?._registrationOrder

    setHotkey('Control+K')
    await waitFor(() => expect(screen.getByTestId('hotkey')).toHaveTextContent('Control+K'))

    expect(store.getState().commands.get('save')?._registrationOrder).toBe(before)
  })
})
