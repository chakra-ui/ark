import * as ratingGroup from '@zag-js/rating-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import { useFieldContext } from '../field'
import type { RootEmits } from './rating-group'

export interface UseRatingGroupProps extends Optional<Omit<ratingGroup.Props, 'dir' | 'getRootNode' | 'value'>, 'id'> {
  modelValue?: ratingGroup.Props['value']
}
export interface UseRatingGroupReturn extends ComputedRef<ratingGroup.Api<PropTypes>> {}

export const useRatingGroup = (props: UseRatingGroupProps = {}, emit?: EmitFn<RootEmits>): UseRatingGroupReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const field = useFieldContext()

  const context = computed<ratingGroup.Props>(() => ({
    id,
    ids: {
      label: field?.value.ids.label,
      hiddenInput: field?.value.ids.control,
    },
    disabled: field?.value.disabled,
    readOnly: field?.value.readOnly,
    required: field?.value.required,
    dir: locale.value.dir,
    value: props.modelValue ?? props.defaultValue,
    getRootNode: env?.value.getRootNode,
    onValueChange(details) {
      emit?.('valueChange', details)
      emit?.('update:modelValue', details.value)
    },
    onHoverChange: (details) => emit?.('hoverChange', details),
    ...cleanProps(props),
  }))

  const service = useMachine(ratingGroup.machine, context)
  return computed(() => ratingGroup.connect(service, normalizeProps))
}
