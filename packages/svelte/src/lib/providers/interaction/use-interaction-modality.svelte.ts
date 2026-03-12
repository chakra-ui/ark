import type { Accessor } from '$lib/types'
import { getInteractionModality, trackInteractionModality, type Modality } from '@zag-js/focus-visible'
import { useEnvironmentContext } from '../environment'

export type { Modality }

export function useInteractionModality(): Accessor<Modality | null> {
  const env = useEnvironmentContext()

  let modality = $state<Modality | null>(getInteractionModality())

  $effect(() => {
    return trackInteractionModality({
      root: env().getRootNode(),
      onChange(details) {
        modality = details.modality
      },
    })
  })

  return () => modality
}
