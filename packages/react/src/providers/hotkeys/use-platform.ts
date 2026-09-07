'use client'

import { isApple, isLinux } from '@zag-js/dom-query'
import { useCallback, useSyncExternalStore } from 'react'

import type { Platform } from '@zag-js/hotkeys'

export type { Platform }

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
