import { getInteractionModality, trackInteractionModality, type Modality } from '@zag-js/focus-visible'
import { useSyncExternalStore } from '@zag-js/solid'
import type { Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'

export type { Modality }

export function useInteractionModality(): Accessor<Modality | null> {
  const environment = useEnvironmentContext()

  return useSyncExternalStore(
    (listener) =>
      trackInteractionModality({
        root: environment().getRootNode(),
        onChange: listener,
      }),
    getInteractionModality,
    () => null,
  )
}
