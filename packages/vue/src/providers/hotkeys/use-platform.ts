import { isApple, isLinux } from '@zag-js/dom-query'
import type { Platform } from '@zag-js/hotkeys'
import { type Ref, onMounted, ref } from 'vue'

export type { Platform }

const detect = (): Platform => {
  if (isApple()) return 'mac'
  if (isLinux()) return 'linux'
  return 'windows'
}

export const usePlatform = (): Ref<Platform> => {
  const platform = ref<Platform>('windows')

  onMounted(() => {
    platform.value = detect()
  })

  return platform
}
