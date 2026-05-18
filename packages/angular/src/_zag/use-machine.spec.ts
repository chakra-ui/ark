import { Component, runInInjectionContext, signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { createMachine, type MachineSchema, type Service } from '@zag-js/core'
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

function mountHarness<TApi>(
  context: () => Partial<TestSchema['props']>,
  connect: (service: Service<TestSchema>) => TApi = ((service: Service<TestSchema>) => service.state) as never,
): HarnessHandle<TApi> {
  @Component({ standalone: true, template: '' })
  class HostComponent {}

  TestBed.configureTestingModule({ imports: [HostComponent] })
  const fixture = TestBed.createComponent(HostComponent)
  const injector = fixture.componentRef.injector

  const result = runInInjectionContext(injector, () =>
    useMachine<TestSchema, TApi>({
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

  it('mirrors service state updates into an Angular signal (criterion 9)', async () => {
    const handle = mountHarness(() => ({ open: false }))
    await Promise.resolve()
    expect(handle.result.state().matches('idle')).toBe(true)
    handle.result.send({ type: 'ACTIVATE' })
    await Promise.resolve()
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
})
