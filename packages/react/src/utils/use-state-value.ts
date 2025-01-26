import { getActiveElement, getDocument, getWindow } from '@zag-js/dom-query'
import { isFunction } from '@zag-js/utils'
import * as React from 'react'
import { useEnvironmentContext, useLocaleContext } from '../providers'
import { flush } from './flush'
import { useEvent } from './use-event'
import { useSafeLayoutEffect } from './use-safe-layout-effect'
import { useUpdateEffect } from './use-update-effect'

export function useStateValue<T>(value: T) {
  const [initialValue] = React.useState(value)
  const [state, setState] = React.useState(initialValue)

  const stateRef = React.useRef(state)
  stateRef.current = state

  const previousState = React.useRef<T | null>(null)
  useSafeLayoutEffect(() => {
    previousState.current = state
  }, [state])
  return {
    initial: initialValue,
    ref: stateRef,
    value: state,
    previousValue: previousState.current,
    get<K extends keyof T>(key: K): T[K] {
      return stateRef.current[key]
    },
    set(value: Partial<T> | ((prev: T) => Partial<T>)) {
      previousState.current = state
      flush(() => {
        setState((curr) => {
          if (typeof value === 'object') {
            return { ...curr, ...(isFunction(value) ? value(curr) : value) }
          }
          return typeof value === 'function' ? value(curr) : value
        })
      })
    },
    matches(...values: T[]) {
      return values.includes(state)
    },
  }
}

export function useRefs<T extends Record<string, unknown>>(initial: T) {
  const refs = React.useRef<T>(initial)
  const setRef = useEvent((obj: Partial<T>) => {
    refs.current = { ...refs.current, ...obj }
  })
  const getRef = useEvent(<K extends keyof T>(key: K): T[K] => refs.current[key])
  return {
    value: refs,
    set: setRef,
    get: getRef,
  }
}

export function useStateEffect<T>(
  state: ReturnType<typeof useStateValue<T>>,
  value: T,
  effect: React.EffectCallback,
) {
  useUpdateEffect(() => {
    if (state.value === value) return effect()
  }, [state.value])
}

export function useUnmount(fn: () => void) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => fn, [])
}

export function useElementScope(idProp?: string) {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()
  const uid = React.useId()
  const id = idProp ?? uid
  const getRootNode = () => (env.getRootNode() ?? document) as Document | ShadowRoot
  const getById = <T extends HTMLElement = HTMLElement>(id: string) =>
    getRootNode().getElementById(id) as T
  const getDoc = () => getDocument(getRootNode())
  const getWin = () => getWindow(getRootNode())
  const getActiveElementFn = () => getActiveElement(getRootNode())
  return {
    dir: locale.dir,
    id,
    getRootNode,
    getById,
    getDoc,
    getWin,
    getActiveElement: getActiveElementFn,
  }
}
