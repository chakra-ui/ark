import { Component, runInInjectionContext, signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { MachineStatus, createMachine, type Machine, type MachineSchema, type Service } from '@zag-js/core'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useMachine } from './use-machine'

interface TestSchema extends MachineSchema {
  props: {
    label?: string
    open?: boolean
    onSelect?: () => string
  }
  context: Record<string, never>
  state: 'idle' | 'active'
  event: { type: 'ACTIVATE' }
}

const machine = createMachine<TestSchema>({
  initialState: () => 'idle',
  states: {
    idle: {
      on: {
        ACTIVATE: { target: 'active' },
      },
    },
    active: {},
  },
})

interface HarnessHandle<TApi> {
  result: ReturnType<typeof useMachine<TestSchema, TApi>>
  destroy: () => void
}

function mountMachine<TSchema extends MachineSchema, TApi>(
  machine: Machine<TSchema>,
  context: () => Partial<TSchema['props']>,
  connect: (service: Service<TSchema>) => TApi = ((service: Service<TSchema>) => service.state) as never,
): { result: ReturnType<typeof useMachine<TSchema, TApi>>; destroy: () => void } {
  @Component({ standalone: true, template: '' })
  class HostComponent {}

  TestBed.configureTestingModule({ imports: [HostComponent] })
  const fixture = TestBed.createComponent(HostComponent)
  const injector = fixture.componentRef.injector

  const result = runInInjectionContext(injector, () =>
    useMachine<TSchema, TApi>({
      machine,
      context,
      connect: (service) => connect(service),
    }),
  )

  return {
    result,
    destroy: () => fixture.destroy(),
  }
}

function mountHarness<TApi>(
  context: () => Partial<TestSchema['props']>,
  connect: (service: Service<TestSchema>) => TApi = ((service: Service<TestSchema>) => service.state) as never,
): HarnessHandle<TApi> {
  return mountMachine(machine, context, connect)
}

describe('useMachine', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('initializes the service with the initial context (criterion 8)', () => {
    const handle = mountHarness(() => ({ open: false, label: 'foo' }))
    expect(handle.result.service.prop('open')).toBe(false)
    expect(handle.result.service.prop('label')).toBe('foo')
    handle.destroy()
  })

  it('mirrors service state updates into an Angular signal (criterion 9)', () => {
    const handle = mountHarness(() => ({ open: false }))
    TestBed.tick()
    expect(handle.result.state().matches('idle')).toBe(true)
    handle.result.send({ type: 'ACTIVATE' })
    TestBed.tick()
    expect(handle.result.state().matches('active')).toBe(true)
    handle.destroy()
  })

  it('calls setContext only with changed keys after initialization (criterion 10)', () => {
    const ctx = signal<{ open: boolean; label: string }>({ open: false, label: 'foo' })
    const handle = mountHarness(() => ctx())
    const setContext = vi.spyOn(
      handle.result.service as unknown as { setContext: (patch: unknown) => void },
      'setContext',
    )
    TestBed.tick()
    expect(setContext).not.toHaveBeenCalled()

    ctx.set({ open: true, label: 'foo' })
    TestBed.tick()
    expect(setContext).toHaveBeenCalledTimes(1)
    expect(setContext).toHaveBeenCalledWith({ open: true })
    handle.destroy()
  })

  it('preserves stable callback wrapper identity across context recomputation (criterion 12)', () => {
    const handler = signal<() => string>(() => 'first')
    const handle = mountHarness(() => ({ onSelect: handler() }))
    const initialWrapper = handle.result.service.prop('onSelect')
    expect(typeof initialWrapper).toBe('function')
    expect(initialWrapper?.()).toBe('first')

    handler.set(() => 'second')
    TestBed.tick()

    expect(handle.result.service.prop('onSelect')).toBe(initialWrapper)
    expect(initialWrapper?.()).toBe('second')
    handle.destroy()
  })

  it('patches disappeared context keys to undefined', () => {
    const ctx = signal<Record<string, unknown>>({ open: false, label: 'foo' })
    const handle = mountHarness(() => ctx())
    const setContext = vi.spyOn(
      handle.result.service as unknown as { setContext: (patch: unknown) => void },
      'setContext',
    )
    TestBed.tick()

    ctx.set({ open: false })
    TestBed.tick()

    expect(setContext).toHaveBeenCalledWith({ label: undefined })
    expect(handle.result.service.prop('label')).toBeUndefined()
    handle.destroy()
  })

  it('suppresses no-op setContext calls when values are unchanged (criterion 11)', () => {
    const ctx = signal<{ open: boolean }>({ open: false })
    const handle = mountHarness(() => ctx())
    const setContext = vi.spyOn(
      handle.result.service as unknown as { setContext: (patch: unknown) => void },
      'setContext',
    )
    TestBed.tick()
    ctx.set({ open: false })
    TestBed.tick()
    expect(setContext).not.toHaveBeenCalled()
    handle.destroy()
  })

  it('stops the service and clears subscribers on destroy', () => {
    const handle = mountHarness(() => ({ open: false }))
    TestBed.tick()
    const listener = vi.fn()
    const service = handle.result.service as unknown as {
      subscribe: (listener: (state: unknown) => void) => () => void
    }
    service.subscribe(listener)

    handle.result.send({ type: 'ACTIVATE' })
    expect(listener).toHaveBeenCalledTimes(1)
    expect(handle.result.service.getStatus()).toBe(MachineStatus.Started)

    handle.destroy()
    handle.result.send({ type: 'ACTIVATE' })

    expect(handle.result.service.getStatus()).toBe(MachineStatus.Stopped)
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('does not echo controlled prop updates through bindable onChange', () => {
    interface ControlledSchema extends MachineSchema {
      props: {
        value?: string
        onValueChange?: (value: string, prev: string | undefined) => void
      }
      context: {
        value: string
      }
      state: 'idle'
      event: { type: 'NOOP' }
    }

    const onValueChange = vi.fn()
    const value = signal('a')
    const controlledMachine = createMachine<ControlledSchema>({
      initialState: () => 'idle',
      context({ bindable, prop }) {
        return {
          value: bindable(() => ({
            value: prop('value'),
            onChange: prop('onValueChange'),
          })),
        }
      },
      states: {
        idle: {},
      },
    })
    const handle = mountMachine(controlledMachine, () => ({ value: value(), onValueChange }))

    expect(handle.result.service.context.get('value')).toBe('a')
    value.set('b')
    TestBed.tick()

    expect(handle.result.service.context.get('value')).toBe('b')
    expect(onValueChange).not.toHaveBeenCalled()

    handle.result.service.context.set('value', 'c')
    expect(onValueChange).toHaveBeenCalledWith('c', 'b')
    handle.destroy()
  })

  it('runs guards, actions, reentered effects, tags, and exit cleanup', () => {
    interface AdvancedSchema extends MachineSchema {
      props: {
        allow?: boolean
      }
      state: 'idle' | 'active'
      event: { type: 'ACTIVATE' } | { type: 'REENTER' } | { type: 'RESET' }
      guard: 'canActivate'
      action: 'idleExit' | 'activated' | 'activeEntry' | 'activeExit' | 'reentered' | 'machineExit'
      effect: 'activeEffect'
      tag: 'loaded'
    }

    const calls: string[] = []
    const allow = signal(false)
    const advancedMachine = createMachine<AdvancedSchema>({
      initialState: () => 'idle',
      exit: ['machineExit'],
      states: {
        idle: {
          exit: ['idleExit'],
          on: {
            ACTIVATE: { target: 'active', guard: 'canActivate', actions: ['activated'] },
          },
        },
        active: {
          tags: ['loaded'],
          entry: ['activeEntry'],
          exit: ['activeExit'],
          effects: ['activeEffect'],
          on: {
            REENTER: { target: 'active', reenter: true, actions: ['reentered'] },
            RESET: { target: 'idle' },
          },
        },
      },
      implementations: {
        guards: {
          canActivate: ({ prop }) => !!prop('allow'),
        },
        actions: {
          idleExit: () => calls.push('idleExit'),
          activated: () => calls.push('activated'),
          activeEntry: () => calls.push('activeEntry'),
          activeExit: () => calls.push('activeExit'),
          reentered: () => calls.push('reentered'),
          machineExit: () => calls.push('machineExit'),
        },
        effects: {
          activeEffect: () => {
            calls.push('effect:start')
            return () => calls.push('effect:cleanup')
          },
        },
      },
    })
    const handle = mountMachine(advancedMachine, () => ({ allow: allow() }))
    TestBed.tick()

    handle.result.send({ type: 'ACTIVATE' })
    expect(handle.result.state().matches('idle')).toBe(true)

    allow.set(true)
    TestBed.tick()
    handle.result.send({ type: 'ACTIVATE' })

    expect(handle.result.state().matches('active')).toBe(true)
    expect(handle.result.state().hasTag('loaded')).toBe(true)
    expect(calls).toEqual(['idleExit', 'activated', 'effect:start', 'activeEntry'])

    handle.result.send({ type: 'REENTER' })
    expect(calls).toEqual([
      'idleExit',
      'activated',
      'effect:start',
      'activeEntry',
      'effect:cleanup',
      'activeExit',
      'reentered',
      'effect:start',
      'activeEntry',
    ])

    handle.result.send({ type: 'RESET' })
    expect(handle.result.state().matches('idle')).toBe(true)
    expect(calls.at(-2)).toBe('effect:cleanup')
    expect(calls.at(-1)).toBe('activeExit')

    handle.destroy()
    expect(calls.at(-1)).toBe('machineExit')
  })

  it('flushes events queued before the machine reaches started status', () => {
    interface QueuedSchema extends MachineSchema {
      props: Record<string, never>
      state: 'idle' | 'active'
      event: { type: 'ACTIVATE' }
      action: 'queueActivate'
    }

    const queuedMachine = createMachine<QueuedSchema>({
      initialState: () => 'idle',
      entry: ['queueActivate'],
      states: {
        idle: {
          on: {
            ACTIVATE: { target: 'active' },
          },
        },
        active: {},
      },
      implementations: {
        actions: {
          queueActivate: ({ send }) => send({ type: 'ACTIVATE' }),
        },
      },
    })
    const handle = mountMachine(queuedMachine, () => ({}))
    TestBed.tick()

    expect(handle.result.state().matches('active')).toBe(true)
    handle.destroy()
  })

  it('runs watch-track transitions when context is patched', () => {
    interface WatchSchema extends MachineSchema {
      props: {
        open?: boolean
      }
      state: 'idle' | 'active'
      event: { type: 'ACTIVATE' }
    }

    const watchMachine = createMachine<WatchSchema>({
      initialState: () => 'idle',
      watch({ prop, send, track }) {
        track([() => prop('open')], () => {
          if (prop('open')) send({ type: 'ACTIVATE' })
        })
      },
      states: {
        idle: {
          on: {
            ACTIVATE: { target: 'active' },
          },
        },
        active: {},
      },
    })
    const handle = mountMachine(watchMachine, () => ({ open: false }))
    const service = handle.result.service as unknown as { setContext: (patch: Record<string, unknown>) => void }
    TestBed.tick()

    service.setContext({ open: true })
    TestBed.tick()

    expect(handle.result.state().matches('active')).toBe(true)
    handle.destroy()
  })

  it('disposes watch-track effects when the service stops', () => {
    interface WatchSchema extends MachineSchema {
      props: {
        open?: boolean
      }
      state: 'idle' | 'active'
      event: { type: 'ACTIVATE' }
    }

    const open = signal(false)
    const watchMachine = createMachine<WatchSchema>({
      initialState: () => 'idle',
      watch({ prop, send, track }) {
        track([() => prop('open')], () => {
          if (prop('open')) send({ type: 'ACTIVATE' })
        })
      },
      states: {
        idle: {
          on: {
            ACTIVATE: { target: 'active' },
          },
        },
        active: {},
      },
    })
    const handle = mountMachine(watchMachine, () => ({ open: open() }))
    const service = handle.result.service as unknown as { getStatus: () => MachineStatus; stop: () => void }
    TestBed.tick()

    service.stop()
    open.set(true)
    TestBed.tick()

    expect(handle.result.state().matches('idle')).toBe(true)
    expect(service.getStatus()).toBe(MachineStatus.Stopped)
    handle.destroy()
  })

  it('drops events sent after the service stops', () => {
    const handle = mountHarness(() => ({ open: false }))
    const service = handle.result.service as unknown as { getStatus: () => MachineStatus; stop: () => void }

    service.stop()
    handle.result.send({ type: 'ACTIVATE' })

    expect(handle.result.state().matches('idle')).toBe(true)
    expect(service.getStatus()).toBe(MachineStatus.Stopped)
    handle.destroy()
  })
})
