import * as rating from '@zag-js/rating-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Accessor, Optional } from '../../types'
import { useFieldContext } from '../field'

export interface UseRatingGroupProps extends Optional<Omit<rating.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseRatingGroupReturn extends Accessor<rating.Api<PropTypes>> {}

export const useRatingGroup = (props: MaybeFunction<UseRatingGroupProps>): UseRatingGroupReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()
  const field = useFieldContext()

  const resolvedProps = $derived.by(() => {
    const localProps = runIfFn(props)
    return {
      ids: {
        label: field?.()?.ids.label,
        hiddenInput: field?.()?.ids.control,
        ...localProps.ids,
      },
      dir: locale().dir,
      disabled: field?.()?.disabled ?? localProps.disabled,
      readOnly: field?.()?.readOnly ?? localProps.readOnly,
      required: field?.()?.required ?? localProps.required,
      getRootNode: env().getRootNode,
      ...localProps,
    }
  })

  const service = useMachine(rating.machine, () => resolvedProps)
  const api = $derived(rating.connect(service, normalizeProps))
  return () => api
}
