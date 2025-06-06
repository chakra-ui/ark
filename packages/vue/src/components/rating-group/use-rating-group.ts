import * as ratingGroup from '@zag-js/rating-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import { useFieldContext } from '../field'
import type { RootEmits } from './rating-group'

export interface UseRatingGroupProps extends Optional<Omit<ratingGroup.Props, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The v-model value of the rating group
   */
  modelValue?: ratingGroup.Props['value']
}
export interface UseRatingGroupReturn extends ComputedRef<ratingGroup.Api<PropTypes>> {}

export const useRatingGroup = (
  props: MaybeRef<UseRatingGroupProps> = {},
  emit?: EmitFn<RootEmits>,
): UseRatingGroupReturn => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const field = useFieldContext()

  const context = computed<ratingGroup.Props>(() => {
    const localProps = toValue<UseRatingGroupProps>(props)

    return {
      id,
      ids: {
        label: field?.value.ids.label,
        hiddenInput: field?.value.ids.control,
      },
      disabled: field?.value.disabled,
      readOnly: field?.value.readOnly,
      required: field?.value.required,
      dir: locale.value.dir,
      value: localProps.modelValue,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localProps),
      onValueChange(details) {
        emit?.('valueChange', details)
        emit?.('update:modelValue', details.value)
        localProps.onValueChange?.(details)
      },
      onHoverChange: (details) => {
        emit?.('hoverChange', details)
        localProps.onHoverChange?.(details)
      },
    }
  })

  const service = useMachine(ratingGroup.machine, context)
  return computed(() => ratingGroup.connect(service, normalizeProps))
}
