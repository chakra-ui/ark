import { DestroyRef, computed, effect, inject, signal } from '@angular/core'
import type { UseMachineOptions, UseMachineReturn } from '../internal/types'
import { normalizeProps } from './normalize-props'

interface ZagServiceLike<TState> {
  state: TState
  send: (event: { type: string } & Record<string, unknown>) => void
  subscribe: (listener: (state: TState) => void) => () => void
  setContext: (patch: Record<string, unknown>) => void
  stop?: () => void
}

type AnyFn = (...args: unknown[]) => unknown

function isPlainFunction(value: unknown): value is AnyFn {
  return typeof value === 'function'
}

export function useMachine<TContext extends Record<string, unknown>, TState, TApi, TService>(
  options: UseMachineOptions<TContext, TState, TApi, TService>,
): UseMachineReturn<TState, TApi, TService> {
  const destroyRef = inject(DestroyRef)

  // Stable wrappers preserve function-valued context entry identity across
  // recomputations, so the machine never sees a "changed" handler reference.
  const latestFns = new Map<string, AnyFn>()
  const wrappers = new Map<string, AnyFn>()

  const resolveValue = (key: string, value: unknown): unknown => {
    if (!isPlainFunction(value)) return value
    latestFns.set(key, value)
    let wrapper = wrappers.get(key)
    if (!wrapper) {
      wrapper = (...args: unknown[]) => {
        const fn = latestFns.get(key)
        return fn ? fn(...args) : undefined
      }
      wrappers.set(key, wrapper)
    }
    return wrapper
  }

  const initialContextRaw = options.context()
  const initialContext: Record<string, unknown> = {}
  for (const key of Object.keys(initialContextRaw)) {
    initialContext[key] = resolveValue(key, (initialContextRaw as Record<string, unknown>)[key])
  }
  let prevRawContext: TContext = initialContextRaw
  let prevResolvedContext = initialContext

  const service = options.machine.start(initialContext as TContext) as unknown as ZagServiceLike<TState> & TService

  const state = signal<TState>(service.state)
  const unsubscribe = service.subscribe((next) => {
    state.set(next)
  })

  effect(() => {
    const nextRaw = options.context()
    const nextKeys = new Set(Object.keys(nextRaw))
    for (const key of Object.keys(prevRawContext)) {
      nextKeys.add(key)
    }
    const patch: Record<string, unknown> = {}
    let hasChanges = false
    const nextResolvedContext: Record<string, unknown> = {}
    for (const key of nextKeys) {
      const nextRawValue = (nextRaw as Record<string, unknown>)[key]
      const prevRawValue = (prevRawContext as Record<string, unknown>)[key]
      const nextResolvedValue = key in nextRaw ? resolveValue(key, nextRawValue) : undefined
      if (key in nextRaw) {
        nextResolvedContext[key] = nextResolvedValue
      }
      if (!Object.is(prevRawValue, nextRawValue) && !Object.is(prevResolvedContext[key], nextResolvedValue)) {
        patch[key] = nextResolvedValue
        hasChanges = true
      }
    }
    if (hasChanges) {
      service.setContext(patch)
    }
    prevRawContext = nextRaw
    prevResolvedContext = nextResolvedContext
  })

  const api = computed(() => {
    state()
    return options.connect(service as unknown as TService, normalizeProps)
  })

  destroyRef.onDestroy(() => {
    unsubscribe()
    service.stop?.()
  })

  return {
    state,
    send: service.send as UseMachineReturn<TState, TApi, TService>['send'],
    service: service as unknown as TService,
    api,
  }
}
