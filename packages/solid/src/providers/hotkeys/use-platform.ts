import { isApple, isLinux } from '@zag-js/dom-query'
import { type Accessor, createSignal, onMount } from 'solid-js'

import type { Platform } from '@zag-js/hotkeys'

export type { Platform }

const detect = (): Platform => {
  if (isApple()) return 'mac'
  if (isLinux()) return 'linux'
  return 'windows'
}

export const usePlatform = (): Accessor<Platform> => {
  const [platform, setPlatform] = createSignal<Platform>('windows')

  onMount(() => {
    setPlatform(detect())
  })

  return platform
}
