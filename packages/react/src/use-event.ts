/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react'
import { flushSync } from 'react-dom'
import { useLatestRef } from './use-latest-ref'

type AnyFunction = (...args: any[]) => any

type Options = {
  /**
   * Whether to use flushSync or not
   */
  sync?: boolean
}

/**
 * Returns a memoized callback that will flushSync the callback if sync is true
 */
export function useEvent<T extends AnyFunction>(callback: T | undefined, opts: Options = {}): T {
  const { sync = false } = opts

  const callbackRef = useLatestRef(callback)

  return useCallback(
    (...args: any[]) => {
      if (sync) return flushSync(() => callbackRef.current?.(...args))
      return callbackRef.current?.(...args)
    },
    [sync, callbackRef],
  ) as T
}
