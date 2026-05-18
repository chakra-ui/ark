import { DestroyRef, computed, effect, inject, signal, untracked, type WritableSignal } from '@angular/core'
import {
  INIT_STATE,
  MachineStatus,
  createScope,
  findTransition,
  getExitEnterStates,
  hasTag,
  matchesState,
  resolveStateValue,
  type Bindable,
  type BindableParams,
  type MachineSchema,
  type Service,
  type Transition,
} from '@zag-js/core'
import { compact, ensure, isEqual, isFunction, isString, toArray, warn } from '@zag-js/utils'
import type { UseMachineOptions, UseMachineReturn } from '@ark-ui/angular/src/internal'
import { normalizeProps } from './normalize-props'

type AnyFn = (...args: unknown[]) => unknown
type EventFor<TSchema extends MachineSchema> = TSchema['event'] & { type: string }
type StateFor<TSchema extends MachineSchema> = Service<TSchema>['state']
type ExtendedService<TSchema extends MachineSchema> = Service<TSchema> & {
  subscribe: (listener: (state: StateFor<TSchema>) => void) => () => void
  setContext: (patch: Record<string, unknown>) => void
  stop: () => void
}

function isPlainFunction(value: unknown): value is AnyFn {
  return typeof value === 'function'
}

const flush = (fn: VoidFunction): void => {
  queueMicrotask(fn)
}

export function useMachine<TSchema extends MachineSchema, TApi>(
  options: UseMachineOptions<TSchema, TApi>,
): UseMachineReturn<StateFor<TSchema>, TApi, Service<TSchema>> {
  const destroyRef = inject(DestroyRef)
  const machine = options.machine

  const latestFns = new Map<string, AnyFn>()
  const wrappers = new Map<string, AnyFn>()

  const resolveValue = (key: string, value: unknown): unknown => {
    if (!isPlainFunction(value)) return value
    latestFns.set(key, value)
    let wrapper = wrappers.get(key)
    if (!wrapper) {
      wrapper = (...args: unknown[]) => latestFns.get(key)?.(...args)
      wrappers.set(key, wrapper)
    }
    return wrapper
  }

  const resolveContext = (raw: Record<string, unknown>): Record<string, unknown> => {
    const resolved: Record<string, unknown> = {}
    for (const key of Object.keys(raw)) {
      resolved[key] = resolveValue(key, raw[key])
    }
    return resolved
  }

  const initialContextRaw = options.context() as Record<string, unknown>
  const initialContext = resolveContext(initialContextRaw)
  const currentProps = signal<Record<string, unknown>>(initialContext)

  const scope = computed(() => {
    const props = currentProps()
    return createScope({
      id: props.id as string | undefined,
      ids: props.ids as Record<string, unknown> | undefined,
      getRootNode: (props.getRootNode as (() => ShadowRoot | Document | Node) | undefined) ?? (() => document),
    })
  })

  const props = computed(() => {
    return machine.props?.({ props: compact(currentProps()) as never, scope: scope() }) ?? currentProps()
  })

  const prop = ((key: string) => props()[key]) as Service<TSchema>['prop']

  const createBindable = <T>(params: () => BindableParams<T>): Bindable<T> => {
    const initial = params().value ?? params().defaultValue
    const value = signal<T | undefined>(initial)
    const ref = { current: initial }

    const get = (): T => {
      const controlled = params().value !== undefined
      const next = controlled ? params().value : value()
      ref.current = next
      return next as T
    }

    return {
      initial,
      ref,
      get,
      set(nextValue) {
        const prev = get()
        const next = isFunction(nextValue) ? (nextValue as (prev: T) => T)(prev) : nextValue
        if (params().debug) {
          console.log(`[bindable > ${params().debug}] setValue`, { next, prev })
        }
        if (params().value === undefined) {
          value.set(next)
        }
        if (!(params().isEqual ?? Object.is)(next, prev)) {
          params().onChange?.(next, prev)
        }
      },
      invoke(nextValue, prevValue) {
        params().onChange?.(nextValue, prevValue)
      },
      hash(valueToHash) {
        return params().hash?.(valueToHash) ?? String(valueToHash)
      },
    }
  }

  createBindable.cleanup = (fn: VoidFunction): void => {
    destroyRef.onDestroy(fn)
  }

  createBindable.ref = <T>(defaultValue: T) => {
    let value = defaultValue
    return {
      get: () => value,
      set: (next: T) => {
        value = next
      },
    }
  }

  const context = machine.context?.({
    prop,
    bindable: createBindable,
    get scope() {
      return scope()
    },
    flush,
    getContext: () => ctx,
    getComputed: () => computedValue,
    getRefs: () => refs,
    getEvent: () => getEvent(),
  } as never)

  const ctx = {
    get(key: string) {
      return (context as Record<string, Bindable<unknown>> | undefined)?.[key]?.get()
    },
    set(key: string, value: unknown) {
      ;(context as Record<string, Bindable<unknown>> | undefined)?.[key]?.set(value)
    },
    initial(key: string) {
      return (context as Record<string, Bindable<unknown>> | undefined)?.[key]?.initial
    },
    hash(key: string) {
      const binding = (context as Record<string, Bindable<unknown>> | undefined)?.[key]
      return binding?.hash(binding.get())
    },
  } as Service<TSchema>['context']

  const refs = (() => {
    const values = machine.refs?.({ prop, context: ctx } as never) ?? {}
    const ref = { current: values as Record<string, unknown> }
    return {
      get(key: string) {
        return ref.current[key]
      },
      set(key: string, value: unknown) {
        ref.current[key] = value
      },
    } as Service<TSchema>['refs']
  })()

  let status = MachineStatus.NotStarted
  let transitionRef: Transition<TSchema> | null = null
  let previousEvent: EventFor<TSchema> | null = null
  let currentEvent = { type: '' } as EventFor<TSchema>
  let pendingEvents: Array<EventFor<TSchema>> = []
  let effects = new Map<string, VoidFunction>()
  const listeners = new Set<(state: StateFor<TSchema>) => void>()

  let stateSignal: WritableSignal<StateFor<TSchema>>

  const getEvent = () =>
    ({
      ...currentEvent,
      current: () => currentEvent,
      previous: () => previousEvent,
    }) as Service<TSchema>['event']

  const getState = (): StateFor<TSchema> =>
    ({
      ...state,
      matches(...values: TSchema['state'][]) {
        const current = state.get()
        return values.some((value) => matchesState(current as string | undefined, value as string))
      },
      hasTag(tag: TSchema['tag']) {
        return hasTag(machine, state.get(), tag)
      },
    }) as StateFor<TSchema>

  const notifyState = (): void => {
    const next = getState()
    stateSignal.set(next)
    for (const listener of listeners) listener(next)
  }

  const getParams = () => ({
    state: getState(),
    context: ctx,
    event: getEvent(),
    prop,
    send,
    action,
    guard,
    track,
    refs,
    computed: computedValue,
    flush,
    get scope() {
      return scope()
    },
    choose,
  })

  const action = (keys: unknown): void => {
    const actionKeys = isFunction(keys) ? keys(getParams()) : keys
    if (!actionKeys) return
    const fns = toArray(actionKeys).map((key) => {
      const fn = (machine.implementations?.actions as Record<string, ((params: unknown) => void) | undefined>)?.[
        String(key)
      ]
      if (!fn) warn(`[zag-js] No implementation found for action "${JSON.stringify(key)}"`)
      return fn
    })
    for (const fn of fns) {
      fn?.(getParams())
    }
  }

  const guard = (key: unknown): boolean | undefined => {
    if (isFunction(key)) return key(getParams()) as boolean
    return (machine.implementations?.guards as Record<string, ((params: unknown) => boolean) | undefined>)?.[
      String(key)
    ]?.(getParams())
  }

  const runEffects = (keys: unknown): VoidFunction | undefined => {
    const effectKeys = isFunction(keys) ? keys(getParams()) : keys
    if (!effectKeys) return undefined
    const fns = toArray(effectKeys).map((key) => {
      const fn = (
        machine.implementations?.effects as Record<string, ((params: unknown) => undefined | VoidFunction) | undefined>
      )?.[String(key)]
      if (!fn) warn(`[zag-js] No implementation found for effect "${JSON.stringify(key)}"`)
      return fn
    })
    const cleanups: VoidFunction[] = []
    for (const fn of fns) {
      const cleanup = fn?.(getParams())
      if (cleanup) cleanups.push(cleanup)
    }
    return cleanups.length > 0
      ? () => {
          for (const cleanup of cleanups) cleanup()
        }
      : undefined
  }

  const choose = (transitions: unknown): Transition<TSchema> | undefined => {
    return toArray(transitions as Transition<TSchema> | Transition<TSchema>[] | undefined).find((transition) => {
      let result = !transition.guard
      if (isString(transition.guard)) result = !!guard(transition.guard)
      else if (isFunction(transition.guard)) result = transition.guard(getParams() as never)
      return result
    })
  }

  const computedValue = ((key: string) => {
    ensure(machine.computed, () => `[zag-js] No computed object found on machine`)
    const fn = (machine.computed as Record<string, ((params: unknown) => unknown) | undefined>)[key]
    return fn?.({
      context: ctx,
      event: getEvent(),
      prop,
      refs,
      get scope() {
        return scope()
      },
      computed: computedValue,
    })
  }) as Service<TSchema>['computed']

  const track = (deps: Array<() => unknown>, fn: VoidFunction): void => {
    let initialized = false
    let previous: unknown[] = []
    effect(() => {
      const current = deps.map((dep) => dep())
      if (!initialized) {
        initialized = true
        previous = current
        return
      }
      if (current.some((value, index) => !isEqual(previous[index], value))) {
        previous = current
        fn()
      }
    })
  }

  const state = createBindable<TSchema['state']>(() => ({
    defaultValue: resolveStateValue(machine, machine.initialState({ prop })),
    onChange(nextState, prevState) {
      const { exiting, entering } = getExitEnterStates(machine, prevState, nextState, transitionRef?.reenter)
      for (const item of exiting) {
        const cleanup = effects.get(item.path)
        cleanup?.()
        effects.delete(item.path)
      }
      for (const item of exiting) {
        action(item.state?.exit)
      }
      action(transitionRef?.actions)
      for (const item of entering) {
        const cleanup = runEffects(item.state?.effects)
        if (cleanup) effects.set(item.path, cleanup)
      }
      if (prevState === INIT_STATE) {
        action(machine.entry)
        const cleanup = runEffects(machine.effects)
        if (cleanup) effects.set(INIT_STATE, cleanup)
      }
      for (const item of entering) {
        action(item.state?.entry)
      }
      notifyState()
    },
  }))

  stateSignal = signal(getState())

  const send = (event: EventFor<TSchema>): void => {
    if (status !== MachineStatus.Started) {
      pendingEvents.push(event)
      return
    }
    previousEvent = currentEvent
    currentEvent = event
    const currentState = untracked(() => state.get())
    const { transitions, source } = findTransition(machine, currentState, event.type)
    const transition = choose(transitions)
    if (!transition) return
    transitionRef = transition
    const target = resolveStateValue(machine, transition.target ?? currentState, source)
    if (target !== currentState) {
      state.set(target)
    } else if (transition.reenter) {
      state.invoke(currentState, currentState)
    } else {
      action(transition.actions)
    }
  }

  const setContext = (patch: Record<string, unknown>): void => {
    currentProps.update((previous) => ({ ...previous, ...patch }))
    notifyState()
  }

  const stop = (): void => {
    if (status === MachineStatus.Stopped) return
    status = MachineStatus.Stopped
    pendingEvents = []
    for (const cleanup of effects.values()) cleanup()
    effects = new Map()
    transitionRef = null
    action(machine.exit)
    listeners.clear()
  }

  const service: ExtendedService<TSchema> = {
    getStatus: () => status,
    get state() {
      return getState()
    },
    context: ctx,
    send,
    prop,
    get scope() {
      return scope()
    },
    refs,
    computed: computedValue,
    get event() {
      return getEvent()
    },
    subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    setContext,
    stop,
  }

  let prevRawContext = initialContextRaw
  let prevResolvedContext = initialContext

  effect(() => {
    const nextRaw = options.context() as Record<string, unknown>
    const nextKeys = new Set(Object.keys(nextRaw))
    for (const key of Object.keys(prevRawContext)) {
      nextKeys.add(key)
    }
    const patch: Record<string, unknown> = {}
    let hasChanges = false
    const nextResolvedContext: Record<string, unknown> = {}
    for (const key of nextKeys) {
      const nextRawValue = nextRaw[key]
      const prevRawValue = prevRawContext[key]
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

  machine.watch?.(getParams() as never)

  status = MachineStatus.Started
  state.invoke(state.initial, INIT_STATE as TSchema['state'])
  const events = pendingEvents
  pendingEvents = []
  for (const event of events) {
    send(event)
  }

  const api = computed(() => {
    // Register state as the api dependency; prop reads happen inside part prop getters.
    void stateSignal()
    return options.connect(service, normalizeProps)
  })

  destroyRef.onDestroy(stop)

  return {
    state: stateSignal.asReadonly(),
    send: service.send as UseMachineReturn<StateFor<TSchema>, TApi, Service<TSchema>>['send'],
    service,
    api,
  }
}
