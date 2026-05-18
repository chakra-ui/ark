import * as ratingGroup from '@zag-js/rating-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.tsx'
import type { MaybeAccessor, Optional } from '../../types.ts'
import { runIfFn } from '../../utils/run-if-fn.ts'
import { useFieldContext } from '../field/index.tsx'

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
