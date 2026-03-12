import { getInteractionModality, trackInteractionModality, type Modality } from '@zag-js/focus-visible'
import { useCallback, useSyncExternalStore } from 'react'
import { useEnvironmentContext } from '../environment'

export type { Modality }

export function useInteractionModality(): Modality | null {
  const { getRootNode } = useEnvironmentContext()

  const subscribe = useCallback(
    (onStoreChange: () => void) =>
      trackInteractionModality({
        root: getRootNode(),
        onChange: onStoreChange,
      }),
    [getRootNode],
  )

  return useSyncExternalStore(subscribe, getInteractionModality, () => null)
}
