import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { createHotkeyStore } from '@zag-js/hotkeys'
import { useFormatHotkey } from './use-format-hotkey.ts'
import { useHotkeyRecorder } from './use-hotkey-recorder.ts'
import { useHotkeyRegistrations } from './use-hotkey-registrations.ts'
import { useHotkeyStore } from './use-hotkey-store.ts'
import { useHotkey } from './use-hotkey.ts'
import { useHotkeys } from './use-hotkeys.ts'
import { useIsKeyPressed } from './use-is-key-pressed.ts'
import { usePlatform } from './use-platform.ts'
import { usePressedKeys } from './use-pressed-keys.ts'

describe('useHotkey', () => {
  it('should invoke the action when the hotkey is pressed', async () => {
    const onAction = vi.fn()

    const Comp = () => {
      useHotkey({ hotkey: 'ctrl+k', action: onAction })
      return <div>ready</div>
    }

    render(<Comp />)

    await user.keyboard('{Control>}k{/Control}')

    await waitFor(() => expect(onAction).toHaveBeenCalledTimes(1))
  })

  it('should not invoke the action after unmount', async () => {
    const onAction = vi.fn()

    const Comp = () => {
      useHotkey({ hotkey: 'ctrl+k', action: onAction })
      return <div>ready</div>
    }

    const { unmount } = render(<Comp />)
    unmount()

    await user.keyboard('{Control>}k{/Control}')

    expect(onAction).not.toHaveBeenCalled()
  })

  it('should always call the latest action without re-registering', async () => {
    const calls: number[] = []

    const Comp = ({ value }: { value: number }) => {
      useHotkey({ hotkey: 'ctrl+k', action: () => calls.push(value) })
      return <div>{value}</div>
    }

    const { rerender } = render(<Comp value={1} />)
    rerender(<Comp value={2} />)

    await user.keyboard('{Control>}k{/Control}')

    await waitFor(() => expect(calls).toEqual([2]))
  })

  it('should respect the enabled option', async () => {
    const onAction = vi.fn()

    const Comp = ({ enabled }: { enabled: boolean }) => {
      useHotkey({ hotkey: 'ctrl+k', action: onAction, enabled })
      return <div>ready</div>
    }

    const { rerender } = render(<Comp enabled={false} />)

    await user.keyboard('{Control>}k{/Control}')
    expect(onAction).not.toHaveBeenCalled()

    rerender(<Comp enabled />)

    await user.keyboard('{Control>}k{/Control}')
    await waitFor(() => expect(onAction).toHaveBeenCalledTimes(1))
  })
})

describe('useHotkeys', () => {
  it('should register multiple hotkeys', async () => {
    const onSave = vi.fn()
    const onUndo = vi.fn()

    const Comp = () => {
      useHotkeys({
        commands: [
          { id: 'save', hotkey: 'ctrl+s', action: onSave },
          { id: 'undo', hotkey: 'ctrl+z', action: onUndo },
        ],
      })
      return <div>ready</div>
    }

    render(<Comp />)

    await user.keyboard('{Control>}s{/Control}')
    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1))

    await user.keyboard('{Control>}z{/Control}')
    await waitFor(() => expect(onUndo).toHaveBeenCalledTimes(1))
  })
})

describe('useHotkeyRegistrations', () => {
  it('should expose registered commands with their metadata', async () => {
    const Comp = () => {
      useHotkeys({
        commands: [
          { id: 'save', hotkey: 'ctrl+s', action: vi.fn(), label: 'Save file', category: 'File' },
          { id: 'undo', hotkey: 'ctrl+z', action: vi.fn(), label: 'Undo', category: 'Edit' },
        ],
      })

      const commands = useHotkeyRegistrations()

      return (
        <ul>
          {commands.map((command) => (
            <li key={command.id}>{`${command.label} — ${command.hotkey} (${command.category})`}</li>
          ))}
        </ul>
      )
    }

    render(<Comp />)

    expect(await screen.findByText('Save file — ctrl+s (File)')).toBeInTheDocument()
    expect(await screen.findByText('Undo — ctrl+z (Edit)')).toBeInTheDocument()
  })

  it('should update when a command unregisters', async () => {
    const Child = () => {
      useHotkey({ hotkey: 'ctrl+s', action: vi.fn(), label: 'Save file' })
      return null
    }

    const Comp = ({ show }: { show: boolean }) => {
      const commands = useHotkeyRegistrations()
      return (
        <div>
          {show && <Child />}
          <span data-testid="count">{commands.length}</span>
        </div>
      )
    }

    const { rerender } = render(<Comp show />)
    await waitFor(() => expect(screen.getByTestId('count')).toHaveTextContent('1'))

    rerender(<Comp show={false} />)
    await waitFor(() => expect(screen.getByTestId('count')).toHaveTextContent('0'))
  })

  it('should return a stable reference while commands are unchanged', async () => {
    const seen: unknown[] = []

    const Comp = ({ tick }: { tick: number }) => {
      useHotkey({ hotkey: 'ctrl+s', action: vi.fn() })
      const commands = useHotkeyRegistrations()
      seen.push(commands)
      return <span data-testid="count">{`${commands.length}:${tick}`}</span>
    }

    const { rerender } = render(<Comp tick={0} />)
    await waitFor(() => expect(screen.getByTestId('count')).toHaveTextContent('1:0'))

    const registered = seen.at(-1)

    rerender(<Comp tick={1} />)
    await waitFor(() => expect(screen.getByTestId('count')).toHaveTextContent('1:1'))

    expect(seen.at(-1)).toBe(registered)

    await user.keyboard('{Control>}s{/Control}')
    expect(seen.at(-1)).toBe(registered)
  })
})

describe('key state', () => {
  it('should track whether a key is pressed', async () => {
    const Comp = () => {
      useHotkey({ hotkey: 'ctrl+k', action: vi.fn() })
      const shift = useIsKeyPressed({ hotkey: 'shift' })
      return <span data-testid="shift">{String(shift)}</span>
    }

    render(<Comp />)
    expect(screen.getByTestId('shift')).toHaveTextContent('false')

    const session = user.setup()

    await session.keyboard('{Shift>}')
    await waitFor(() => expect(screen.getByTestId('shift')).toHaveTextContent('true'))

    await session.keyboard('{/Shift}')
    await waitFor(() => expect(screen.getByTestId('shift')).toHaveTextContent('false'))
  })

  it('should expose currently pressed keys', async () => {
    const Comp = () => {
      useHotkey({ hotkey: 'ctrl+k', action: vi.fn() })
      const keys = usePressedKeys()
      return <span data-testid="keys">{keys.join('+') || 'none'}</span>
    }

    render(<Comp />)
    expect(screen.getByTestId('keys')).toHaveTextContent('none')

    const session = user.setup()

    await session.keyboard('{Shift>}')
    await waitFor(() => expect(screen.getByTestId('keys')).toHaveTextContent('Shift'))

    await session.keyboard('{/Shift}')
    await waitFor(() => expect(screen.getByTestId('keys')).toHaveTextContent('none'))
  })
})

describe('hotkey matching', () => {
  it('should not invoke the action when the hotkey does not match', async () => {
    const onAction = vi.fn()

    const Comp = () => {
      useHotkey({ hotkey: 'ctrl+k', action: onAction })
      return <div>ready</div>
    }

    render(<Comp />)

    await user.keyboard('{Control>}j{/Control}')
    await user.keyboard('k')

    expect(onAction).not.toHaveBeenCalled()
  })

  it('should support the keyup event type', async () => {
    const onAction = vi.fn()

    const Comp = () => {
      useHotkey({ hotkey: 'ctrl+k', action: onAction, options: { eventType: 'keyup' } })
      return <div>ready</div>
    }

    render(<Comp />)

    const session = user.setup()

    await session.keyboard('{Control>}{k>}')
    expect(onAction).not.toHaveBeenCalled()

    await session.keyboard('{/k}{/Control}')
    await waitFor(() => expect(onAction).toHaveBeenCalledTimes(1))
  })

  it('should support sequences', async () => {
    const onAction = vi.fn()

    const Comp = () => {
      useHotkey({ hotkey: 'G > H', action: onAction })
      return <div>ready</div>
    }

    render(<Comp />)

    await user.keyboard('g')
    await user.keyboard('h')

    await waitFor(() => expect(onAction).toHaveBeenCalledTimes(1))
  })
})

describe('registration lifecycle', () => {
  it('should treat an empty command list as a no-op', () => {
    const Comp = () => {
      useHotkeys({ commands: [] })
      return <span data-testid="count">{useHotkeyRegistrations().length}</span>
    }

    render(<Comp />)

    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })

  it('should handle commands being added and removed', async () => {
    const Comp = ({ extra }: { extra: boolean }) => {
      useHotkeys({
        commands: [
          { id: 'save', hotkey: 'ctrl+s', action: vi.fn() },
          ...(extra ? [{ id: 'undo', hotkey: 'ctrl+z', action: vi.fn() }] : []),
        ],
      })
      return <span data-testid="count">{useHotkeyRegistrations().length}</span>
    }

    const { rerender } = render(<Comp extra={false} />)
    await waitFor(() => expect(screen.getByTestId('count')).toHaveTextContent('1'))

    rerender(<Comp extra />)
    await waitFor(() => expect(screen.getByTestId('count')).toHaveTextContent('2'))

    rerender(<Comp extra={false} />)
    await waitFor(() => expect(screen.getByTestId('count')).toHaveTextContent('1'))
  })

  it('should keep a single registration when toggling enabled', async () => {
    const Comp = ({ enabled }: { enabled: boolean }) => {
      useHotkeys({ commands: [{ id: 'save', hotkey: 'ctrl+s', action: vi.fn(), enabled }] })
      const commands = useHotkeyRegistrations()
      return <span data-testid="ids">{commands.map((command) => command.id).join(',') || 'none'}</span>
    }

    const { rerender } = render(<Comp enabled={false} />)
    await waitFor(() => expect(screen.getByTestId('ids')).toHaveTextContent('save'))

    rerender(<Comp enabled />)
    await waitFor(() => expect(screen.getByTestId('ids')).toHaveTextContent('save'))
  })
})

describe('scopes', () => {
  it('should only fire commands within an active scope', async () => {
    const onEditor = vi.fn()
    const onGlobal = vi.fn()

    const store = createHotkeyStore({ activeScopes: ['reader'] })

    const Comp = () => {
      useHotkeys({
        commands: [
          { id: 'editor', hotkey: 'ctrl+b', action: onEditor, scopes: ['editor'] },
          { id: 'global', hotkey: 'ctrl+g', action: onGlobal },
        ],
        store,
      })
      return <div>ready</div>
    }

    render(<Comp />)

    await user.keyboard('{Control>}b{/Control}')
    expect(onEditor).not.toHaveBeenCalled()

    await user.keyboard('{Control>}g{/Control}')
    await waitFor(() => expect(onGlobal).toHaveBeenCalledTimes(1))
  })
})

describe('default store', () => {
  it('should fall back to a shared store', async () => {
    const onAction = vi.fn()

    const Comp = () => {
      useHotkey({ hotkey: 'ctrl+q', action: onAction })
      return <div>ready</div>
    }

    const { unmount } = render(<Comp />)

    await user.keyboard('{Control>}q{/Control}')
    await waitFor(() => expect(onAction).toHaveBeenCalledTimes(1))

    unmount()

    await user.keyboard('{Control>}q{/Control}')
    expect(onAction).toHaveBeenCalledTimes(1)
  })
})

describe('useHotkeyRecorder', () => {
  it('should record a chord and report it', async () => {
    const onRecord = vi.fn()

    const Comp = () => {
      const recorder = useHotkeyRecorder({ onRecord })
      return (
        <button type="button" onClick={() => recorder.start()}>
          {recorder.recording ? 'recording' : 'idle'}
        </button>
      )
    }

    render(<Comp />)

    const session = user.setup()

    expect(screen.getByRole('button')).toHaveTextContent('idle')

    await session.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.getByRole('button')).toHaveTextContent('recording'))

    await session.keyboard('{Control>}k{/Control}')

    await waitFor(() => expect(onRecord).toHaveBeenCalledTimes(1))
    expect(onRecord.mock.calls[0][0]).toMatchObject({
      value: expect.stringContaining('Control'),
      display: expect.any(String),
    })
  })

  it('should expose the recorded value and allow clearing', async () => {
    const Comp = () => {
      const recorder = useHotkeyRecorder()
      return (
        <div>
          <button type="button" onClick={() => recorder.start()}>
            start
          </button>
          <button type="button" onClick={() => recorder.clear()}>
            clear
          </button>
          <span data-testid="value">{recorder.value?.display ?? 'empty'}</span>
        </div>
      )
    }

    render(<Comp />)

    const session = user.setup()

    await session.click(screen.getByRole('button', { name: 'start' }))
    await session.keyboard('{Control>}k{/Control}')

    await waitFor(() => expect(screen.getByTestId('value')).not.toHaveTextContent('empty'))

    await session.click(screen.getByRole('button', { name: 'clear' }))
    await waitFor(() => expect(screen.getByTestId('value')).toHaveTextContent('empty'))
  })
})

describe('usePlatform', () => {
  it('should detect the current platform', () => {
    const Comp = () => <span data-testid="platform">{usePlatform()}</span>

    render(<Comp />)

    expect(screen.getByTestId('platform')).toHaveTextContent(/^(mac|windows|linux)$/)
  })

  it('should format hotkeys for the detected platform', () => {
    const Comp = () => {
      const formatHotkey = useFormatHotkey()
      const platform = usePlatform()
      return <span data-testid="formatted">{`${platform}:${formatHotkey('mod+K')}`}</span>
    }

    render(<Comp />)

    const text = screen.getByTestId('formatted').textContent ?? ''
    const [platform, formatted] = text.split(':')
    expect(formatted).toContain('K')
    expect(formatted).toContain(platform === 'mac' ? '⌘' : 'Ctrl')
  })

  it('should let an explicit platform override the detected one', () => {
    const Comp = () => {
      const formatHotkey = useFormatHotkey()
      return <span data-testid="mac">{formatHotkey('mod+K', { platform: 'mac' })}</span>
    }

    render(<Comp />)

    expect(screen.getByTestId('mac')).toHaveTextContent('⌘')
  })
})

describe('usePlatform / linux', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should resolve linux', () => {
    vi.stubGlobal('navigator', { platform: 'Linux x86_64', userAgent: 'X11; Linux x86_64', vendor: '' })

    const Comp = () => {
      const formatHotkey = useFormatHotkey()
      return <span data-testid="out">{`${usePlatform()}|${formatHotkey('meta+K')}`}</span>
    }

    render(<Comp />)

    expect(screen.getByTestId('out')).toHaveTextContent('linux|Super')
  })

  it('should not resolve android as linux', () => {
    vi.stubGlobal('navigator', {
      platform: 'Linux armv8l',
      userAgent: 'Mozilla/5.0 (Linux; Android 14) Chrome/120',
      vendor: '',
    })

    const Comp = () => <span data-testid="out">{usePlatform()}</span>

    render(<Comp />)

    expect(screen.getByTestId('out')).toHaveTextContent('windows')
  })
})

describe('registration reconciliation', () => {
  it('should not re-register commands that did not change', async () => {
    const orders = () => {
      const store = getStore()
      return Object.fromEntries(
        Array.from(store.getState().commands.values(), (command) => [command.id, command._registrationOrder]),
      )
    }

    let getStore!: () => ReturnType<typeof useHotkeyStore>

    const Comp = ({ label }: { label: string }) => {
      const store = useHotkeyStore()
      getStore = () => store
      useHotkeys({
        commands: [
          { id: 'save', hotkey: 'ctrl+s', action: vi.fn(), label: 'Save' },
          { id: 'undo', hotkey: 'ctrl+z', action: vi.fn(), label },
        ],
      })
      return <span data-testid="count">{useHotkeyRegistrations().length}</span>
    }

    const { rerender } = render(<Comp label="Undo" />)
    await waitFor(() => expect(screen.getByTestId('count')).toHaveTextContent('2'))

    const before = orders()

    rerender(<Comp label="Undo edit" />)
    await waitFor(() => expect(getStore().getState().commands.get('undo')?.label).toBe('Undo edit'))

    const after = orders()

    expect(after.save).toBe(before.save)
    expect(after.undo).not.toBe(before.undo)
  })

  it('should not re-register when an unrelated render occurs', async () => {
    let getStore!: () => ReturnType<typeof useHotkeyStore>

    const Comp = ({ tick }: { tick: number }) => {
      const store = useHotkeyStore()
      getStore = () => store
      useHotkeys({ commands: [{ id: 'save', hotkey: 'ctrl+s', action: vi.fn() }] })
      return <span data-testid="tick">{tick}</span>
    }

    const { rerender } = render(<Comp tick={0} />)
    await waitFor(() => expect(screen.getByTestId('tick')).toHaveTextContent('0'))

    const before = getStore().getState().commands.get('save')?._registrationOrder

    rerender(<Comp tick={1} />)
    await waitFor(() => expect(screen.getByTestId('tick')).toHaveTextContent('1'))

    expect(getStore().getState().commands.get('save')?._registrationOrder).toBe(before)
  })

  it('should treat equivalent hotkey spellings as unchanged', async () => {
    let getStore!: () => ReturnType<typeof useHotkeyStore>

    const Comp = ({ hotkey }: { hotkey: string }) => {
      const store = useHotkeyStore()
      getStore = () => store
      useHotkeys({ commands: [{ id: 'save', hotkey, action: vi.fn() }] })
      return <span data-testid="hotkey">{hotkey}</span>
    }

    const { rerender } = render(<Comp hotkey="ctrl+k" />)
    await waitFor(() => expect(screen.getByTestId('hotkey')).toHaveTextContent('ctrl+k'))

    const before = getStore().getState().commands.get('save')?._registrationOrder

    rerender(<Comp hotkey="Control+K" />)
    await waitFor(() => expect(screen.getByTestId('hotkey')).toHaveTextContent('Control+K'))

    expect(getStore().getState().commands.get('save')?._registrationOrder).toBe(before)
  })
})
