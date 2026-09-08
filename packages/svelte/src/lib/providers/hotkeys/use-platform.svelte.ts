import { isApple, isLinux } from '@zag-js/dom-query'

import type { Platform } from '@zag-js/hotkeys'

export type { Platform }

const detect = (): Platform => {
  if (isApple()) return 'mac'
  if (isLinux()) return 'linux'
  return 'windows'
}

export function usePlatform(): () => Platform {
  let platform = $state<Platform>('windows')

  $effect(() => {
    platform = detect()
  })

  return () => platform
}
