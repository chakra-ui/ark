import {
  INIT_STATE,
  MachineStatus,
  createScope,
  findTransition,
  getExitEnterStates,
  resolveStateValue,
} from '@zag-js/core'

interface ZagMachineLike {
  initialState: (params: { prop: (key: string) => unknown }) => string
  states?: Record<string, ZagState | undefined>
  on?: Record<string, ZagTransition | ZagTransition[] | undefined>
  entry?: string[] | ((params: ZagParams) => string[] | undefined)
  exit?: string[] | ((params: ZagParams) => string[] | undefined)
  effects?: string[] | ((params: ZagParams) => string[] | undefined)
  implementations?: {
    actions?: Record<string, (params: ZagParams) => void>
    effects?: Record<string, (params: ZagParams) => void | (() => void)>
  }
}

interface ZagState {
  entry?: string[] | ((params: ZagParams) => string[] | undefined)
  exit?: string[] | ((params: ZagParams) => string[] | undefined)
  effects?: string[] | ((params: ZagParams) => string[] | undefined)
  on?: Record<string, ZagTransition | ZagTransition[] | undefined>
}

interface ZagTransition {
  target?: string
  actions?: string[]
  reenter?: boolean
}

interface ZagParams {
  state: { ref: { current: string }; get: () => string; matches: (...vals: string[]) => boolean }
  context: { get: (key: string) => unknown; set: (key: string, value: unknown) => void }
  event: { type: string } & Record<string, unknown>
  prop: (key: string) => unknown
  send: (event: { type: string } & Record<string, unknown>) => void
  scope: ReturnType<typeof createScope>
}

export interface ZagServiceLike {
  state: {
    get: () => string
    matches: (...values: string[]) => boolean
    hasTag: () => boolean
  }
  send: (event: { type: string } & Record<string, unknown>) => void
  subscribe: (listener: (state: ZagServiceLike['state']) => void) => () => void
  setContext: (patch: Record<string, unknown>) => void
  stop: () => void
  prop: (key: string) => unknown
  scope: ReturnType<typeof createScope>
  getStatus: () => MachineStatus
  context: ZagParams['context']
  refs: Record<string, unknown>
  computed: (key: string) => unknown
  event: ZagParams['event']
}

interface AdapterOptions {
  machine: ZagMachineLike
  context: Record<string, unknown>
}

const toArray = <T>(value: T | T[] | undefined): T[] => {
  if (value == null) return []
  return Array.isArray(value) ? [...value] : [value]
}

export function startZagMachine(options: AdapterOptions): ZagServiceLike {
  const { machine } = options
  let userProps: Record<string, unknown> = { ...options.context }

  const scopeFromProps = (): ReturnType<typeof createScope> => {
    const id = userProps['id'] as string | undefined
    const ids = userProps['ids'] as Record<string, unknown> | undefined
    const getRootNode = userProps['getRootNode'] as (() => Document | ShadowRoot) | undefined
    return createScope({ id, ids, getRootNode: getRootNode as never })
  }

  let scope = scopeFromProps()

  const propFn = (key: string): unknown => userProps[key]

  let currentStateValue = ''
  const stateListeners = new Set<(s: ZagServiceLike['state']) => void>()

  const buildStateSnapshot = (): ZagServiceLike['state'] => {
    const snapshot = currentStateValue
    return {
      get: () => snapshot,
      matches: (...values: string[]) => values.some((v) => snapshot === v || snapshot.startsWith(`${v}.`)),
      hasTag: () => false,
    }
  }

  let stateApi: ZagServiceLike['state'] = buildStateSnapshot()

  let status: MachineStatus = MachineStatus.NotStarted
  let currentEvent: { type: string } & Record<string, unknown> = { type: '' }
  const effectCleanups = new Map<string, () => void>()

  const contextStore: Record<string, unknown> = {}
  const contextApi: ZagParams['context'] = {
    get: (key: string) => contextStore[key],
    set: (key: string, value: unknown) => {
      contextStore[key] = value
    },
  }

  const getParams = (): ZagParams => ({
    state: { ref: { current: currentStateValue }, get: stateApi.get, matches: stateApi.matches },
    context: contextApi,
    event: currentEvent,
    prop: propFn,
    send,
    scope,
  })

  const runActions = (keys: string[] | ((p: ZagParams) => string[] | undefined) | undefined): void => {
    if (!keys) return
    const list = typeof keys === 'function' ? keys(getParams()) : keys
    if (!list) return
    for (const key of list) {
      const fn = machine.implementations?.actions?.[key]
      fn?.(getParams())
    }
  }

  const runEffects = (keys: string[] | ((p: ZagParams) => string[] | undefined) | undefined, pathKey: string): void => {
    if (!keys) return
    const list = typeof keys === 'function' ? keys(getParams()) : keys
    if (!list) return
    const cleanups: Array<() => void> = []
    for (const key of list) {
      const fn = machine.implementations?.effects?.[key]
      const cleanup = fn?.(getParams())
      if (typeof cleanup === 'function') cleanups.push(cleanup)
    }
    if (cleanups.length > 0) {
      effectCleanups.set(pathKey, () => {
        for (const c of cleanups) c()
      })
    }
  }

  const setState = (next: string): void => {
    const prev = currentStateValue
    if (prev === next && status === MachineStatus.Started) return
    const { exiting, entering } = getExitEnterStates(machine as never, prev || undefined, next)
    for (const item of exiting) {
      const cleanup = effectCleanups.get(item.path)
      cleanup?.()
      effectCleanups.delete(item.path)
      runActions((item.state as ZagState).exit)
    }
    currentStateValue = next
    if (prev === '' || prev === INIT_STATE) {
      runActions(machine.entry)
      runEffects(machine.effects, INIT_STATE)
    }
    for (const item of entering) {
      runActions((item.state as ZagState).entry)
      runEffects((item.state as ZagState).effects, item.path)
    }
    stateApi = buildStateSnapshot()
    for (const l of stateListeners) l(stateApi)
  }

  const send = (event: { type: string } & Record<string, unknown>): void => {
    if (status !== MachineStatus.Started) return
    currentEvent = event
    const { transitions, source } = findTransition(machine as never, currentStateValue, event.type)
    const trList = toArray(transitions as ZagTransition[] | undefined)
    const transition = trList[0]
    if (!transition) return
    const target = resolveStateValue(
      machine as never,
      transition.target ?? currentStateValue,
      source as string | undefined,
    ) as string
    if (target !== currentStateValue) {
      // run transition actions then change state
      runActions(transition.actions)
      setState(target)
    } else if (transition.reenter) {
      setState(target)
    } else {
      runActions(transition.actions)
    }
  }

  const start = (): void => {
    status = MachineStatus.Started
    const initial = machine.initialState({ prop: propFn })
    setState(resolveStateValue(machine as never, initial) as string)
  }

  const stop = (): void => {
    if (status === MachineStatus.Stopped) return
    for (const cleanup of effectCleanups.values()) cleanup()
    effectCleanups.clear()
    stateListeners.clear()
    status = MachineStatus.Stopped
  }

  const service: ZagServiceLike = {
    get state() {
      return stateApi
    },
    send,
    subscribe: (listener) => {
      stateListeners.add(listener)
      return () => {
        stateListeners.delete(listener)
      }
    },
    setContext: (patch: Record<string, unknown>) => {
      userProps = { ...userProps, ...patch }
      scope = scopeFromProps()
      stateApi = buildStateSnapshot()
      for (const l of stateListeners) l(stateApi)
    },
    stop,
    prop: propFn,
    get scope() {
      return scope
    },
    getStatus: () => status,
    context: contextApi,
    refs: {},
    computed: () => undefined,
    get event() {
      return currentEvent
    },
  } as ZagServiceLike

  start()
  return service
}
