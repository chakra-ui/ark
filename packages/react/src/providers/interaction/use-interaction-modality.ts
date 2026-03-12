import { getInteractionModality, trackInteractionModality, type Modality } from '@zag-js/focus-visible'
import { useCallback, useSyncExternalStore } from 'react'
import { useEnvironmentContext } from '../environment'

export type { Modality }

export function useInteractionModality(): Modality | null {
  const { getRootNode } = useEnvironmentContext()
  return useSyncExternalStore(
    useCallback((onChange) => trackInteractionModality({ root: getRootNode(), onChange }), [getRootNode]),
    getInteractionModality,
    () => null,
  )
}
