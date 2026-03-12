import { getInteractionModality, trackInteractionModality, type Modality } from '@zag-js/focus-visible'
import { useSyncExternalStore } from '@zag-js/vue'
import type { DeepReadonly, ShallowRef } from 'vue'
import { DEFAULT_ENVIRONMENT, useEnvironmentContext } from '../environment'

export type { Modality }

export function useInteractionModality(): DeepReadonly<ShallowRef<Modality | null>> {
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)

  return useSyncExternalStore(
    (listener) =>
      trackInteractionModality({
        root: env.value.getRootNode(),
        onChange: listener,
      }),
    getInteractionModality,
    () => null,
  )
}
