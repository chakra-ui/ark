import { Component, runInInjectionContext, signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import type { UseMachineOptions, UseMachineReturn } from '../internal/types'
import { useMachine } from './use-machine'

interface FakeState {
  value: string
  context: Record<string, unknown>
}

interface FakeService {
  state: FakeState
  send: (event: { type: string } & Record<string, unknown>) => void
  subscribe: (listener: (state: FakeState) => void) => () => void
  setContext: (patch: Record<string, unknown>) => void
  stop: () => void
  __listeners: Set<(s: FakeState) => void>
  __stopped: boolean
  __setContextCalls: Array<Record<string, unknown>>
}

interface FakeMachine {
  start: (context: Record<string, unknown>) => FakeService
  __startCalls: number
  __initialContext: Record<string, unknown> | null
  __service: FakeService | null
}

function createFakeMachine(): FakeMachine {
  const machine: FakeMachine = {
    __startCalls: 0,
    __initialContext: null,
    __service: null,
    start(context) {
      machine.__startCalls += 1
      machine.__initialContext = context
      const listeners = new Set<(s: FakeState) => void>()
      let currentState: FakeState = { value: 'idle', context: { ...context } }
      const service: FakeService = {
        get state() {
          return currentState
        },
        send(event) {
          currentState = { ...currentState, value: event.type }
          for (const l of listeners) l(currentState)
        },
        subscribe(listener) {
          listeners.add(listener)
          return () => {
            listeners.delete(listener)
          }
        },
        setContext(patch) {
          service.__setContextCalls.push(patch)
          currentState = {
            ...currentState,
            context: { ...currentState.context, ...patch },
          }
          for (const l of listeners) l(currentState)
        },
        stop() {
          service.__stopped = true
          listeners.clear()
        },
        __listeners: listeners,
        __stopped: false,
        __setContextCalls: [],
      }
      machine.__service = service
      return service
    },
  }
  return machine
}

interface HarnessHandle<TApi> {
  result: UseMachineReturn<FakeState, TApi, FakeService>
  machine: FakeMachine
  destroy: () => void
}

function mountHarness<TContext extends Record<string, unknown>, TApi>(
  context: () => TContext,
  connect: (state: FakeState, send: FakeService['send']) => TApi = ((s: FakeState) => s) as never,
): HarnessHandle<TApi> {
  const machine = createFakeMachine()

  @Component({ standalone: true, template: '' })
  class HostComponent {}

  TestBed.configureTestingModule({ imports: [HostComponent] })
  const fixture = TestBed.createComponent(HostComponent)
  const injector = fixture.componentRef.injector

  const options: UseMachineOptions<TContext, FakeState, TApi, FakeService> = {
    machine: machine as unknown as { start: (context: TContext) => FakeService },
    context,
    connect: (state, send) => connect(state, send as FakeService['send']),
  }

  const result = runInInjectionContext(injector, () => useMachine<TContext, FakeState, TApi, FakeService>(options))

  return {
    result,
    machine,
    destroy: () => fixture.destroy(),
  }
}

describe('useMachine', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('initializes the service exactly once with the initial context (criterion 8)', () => {
    const handle = mountHarness(() => ({ open: false, label: 'foo' }))
    expect(handle.machine.__startCalls).toBe(1)
    expect(handle.machine.__initialContext).toMatchObject({ open: false, label: 'foo' })
    handle.destroy()
  })

  it('mirrors service state updates into an Angular signal (criterion 9)', async () => {
    const handle = mountHarness(() => ({ open: false }))
    expect(handle.result.state().value).toBe('idle')
    handle.machine.__service!.send({ type: 'TOGGLE' })
    await Promise.resolve()
    expect(handle.result.state().value).toBe('TOGGLE')
    handle.destroy()
  })

  it('calls setContext only with changed keys after initialization (criterion 10)', async () => {
    const ctx = signal<{ open: boolean; label: string }>({ open: false, label: 'foo' })
    const handle = mountHarness(() => ctx())
    TestBed.tick()
    expect(handle.machine.__service!.__setContextCalls.length).toBe(0)

    ctx.set({ open: true, label: 'foo' })
    TestBed.tick()
    const calls = handle.machine.__service!.__setContextCalls
    expect(calls.length).toBe(1)
    expect(calls[0]).toEqual({ open: true })
    handle.destroy()
  })

  it('preserves stable callback wrapper identity across context recomputation (criterion 12)', async () => {
    const handler = signal<() => string>(() => 'first')
    const handle = mountHarness(() => ({ onSelect: handler() }))
    const initialWrapper = handle.machine.__initialContext!['onSelect']
    expect(typeof initialWrapper).toBe('function')
    expect((initialWrapper as () => string)()).toBe('first')

    handler.set(() => 'second')
    TestBed.tick()

    expect(handle.machine.__service!.__setContextCalls.length).toBe(0)
    expect((initialWrapper as () => string)()).toBe('second')
    handle.destroy()
  })

  it('patches disappeared context keys to undefined', () => {
    const ctx = signal<Record<string, unknown>>({ open: false, label: 'foo' })
    const handle = mountHarness(() => ctx())
    TestBed.tick()

    ctx.set({ open: false })
    TestBed.tick()

    expect(handle.machine.__service!.__setContextCalls).toEqual([{ label: undefined }])
    handle.destroy()
  })

  it('suppresses no-op setContext calls when values are unchanged (criterion 11)', async () => {
    const ctx = signal<{ open: boolean }>({ open: false })
    const handle = mountHarness(() => ctx())
    TestBed.tick()
    ctx.set({ open: false })
    TestBed.tick()
    expect(handle.machine.__service!.__setContextCalls.length).toBe(0)
    handle.destroy()
  })

  it('suppresses controlled model echo when value is unchanged (criterion 11)', async () => {
    const controlled = signal(true)
    const handle = mountHarness(() => ({ open: controlled() }))
    TestBed.tick()
    controlled.set(true)
    TestBed.tick()
    expect(handle.machine.__service!.__setContextCalls.length).toBe(0)
    controlled.set(false)
    TestBed.tick()
    expect(handle.machine.__service!.__setContextCalls.length).toBe(1)
    expect(handle.machine.__service!.__setContextCalls[0]).toEqual({ open: false })
    handle.destroy()
  })

  it('stops the service and unsubscribes when the injection context is destroyed (criterion 13)', async () => {
    const handle = mountHarness(() => ({ open: false }))
    const service = handle.machine.__service!
    expect(service.__listeners.size).toBe(1)
    expect(service.__stopped).toBe(false)
    handle.destroy()
    expect(service.__stopped).toBe(true)
    expect(service.__listeners.size).toBe(0)
  })
})
