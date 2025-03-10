import * as ratingGroup from '@zag-js/rating-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { MaybeAccessor, Optional } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'
import { useFieldContext } from '../field'

export interface UseRatingGroupProps extends Optional<Omit<ratingGroup.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseRatingGroupReturn extends Accessor<ratingGroup.Api<PropTypes>> {}

export const useRatingGroup = (props?: MaybeAccessor<UseRatingGroupProps>): UseRatingGroupReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const field = useFieldContext()

  const machineProps = createMemo<ratingGroup.Props>(() => ({
    id,
    ids: {
      label: field?.().ids.label,
      hiddenInput: field?.().ids.control,
    },
    disabled: field?.().disabled,
    readOnly: field?.().readOnly,
    required: field?.().required,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(ratingGroup.machine, machineProps)
  return createMemo(() => ratingGroup.connect(service, normalizeProps))
}
