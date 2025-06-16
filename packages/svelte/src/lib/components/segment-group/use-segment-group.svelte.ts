import * as segmentGroup from '@zag-js/radio-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Accessor, Optional } from '../../types'

export interface UseSegmentGroupProps extends Optional<Omit<segmentGroup.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseSegmentGroupReturn extends Accessor<segmentGroup.Api<PropTypes>> {}

export const useSegmentGroup = (props: MaybeFunction<UseSegmentGroupProps>): UseSegmentGroupReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const resolvedProps = $derived.by(() => {
    const localProps = runIfFn(props)
    return {
      dir: locale().dir,
      getRootNode: env().getRootNode,
      ...localProps,
    }
  })

  const service = useMachine(segmentGroup.machine, () => resolvedProps)
  const api = $derived(segmentGroup.connect(service, normalizeProps))
  return () => api
}
