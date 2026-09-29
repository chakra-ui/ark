import { getPlatform, isAndroid, isApple } from '@zag-js/dom-query'
import { type Ref, onMounted, ref } from 'vue'

// TODO(zag-bump): once @zag-js/hotkeys > 1.43.1 is released, import `Platform` from it and
// replace the inline linux check with `isLinux` from @zag-js/dom-query.
export type Platform = 'mac' | 'windows' | 'linux'

const isLinux = () => /^Linux|^CrOS/i.test(getPlatform()) && !isAndroid()

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
