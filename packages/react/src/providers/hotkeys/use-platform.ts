'use client'

import { getPlatform, isAndroid, isApple } from '@zag-js/dom-query'
import { useCallback, useSyncExternalStore } from 'react'

// TODO(zag-bump): once @zag-js/hotkeys > 1.43.1 is released, import `Platform` from it and
// replace the inline linux check with `isLinux` from @zag-js/dom-query.
export type Platform = 'mac' | 'windows' | 'linux'

const isLinux = () => /^Linux|^CrOS/i.test(getPlatform()) && !isAndroid()

const subscribe = () => () => {}

const detect = (): Platform => {
  if (isApple()) return 'mac'
  if (isLinux()) return 'linux'
  return 'windows'
}

export const usePlatform = (): Platform => {
  const getSnapshot = useCallback(detect, [])
  const getServerSnapshot = useCallback((): Platform => 'windows', [])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
