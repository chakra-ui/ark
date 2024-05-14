import * as ratingGroup from '@zag-js/rating-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './rating-group'

export interface UseRatingGroupProps
  extends Optional<Omit<ratingGroup.Context, 'dir' | 'getRootNode' | 'value'>, 'id'> {
  /**
   * The initial value of the rating group when it is first rendered.
   * Use when you do not need to control the state of the rating group.
   */
  defaultValue?: ratingGroup.Context['value']
  modelValue?: ratingGroup.Context['value']
}

export interface UseRatingGroupReturn extends ComputedRef<ratingGroup.Api<PropTypes>> {}

export const useRatingGroup = (
  props: UseRatingGroupProps,
  emit: EmitFn<RootEmits>,
): UseRatingGroupReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<ratingGroup.Context>(() => ({
    id: id.value,
    dir: locale.value.dir,
    value: props.modelValue ?? props.defaultValue,
    getRootNode: env?.value.getRootNode,
    onValueChange(details) {
      emit('valueChange', details)
      emit('update:modelValue', details.value)
    },
    onHoverChange: (details) => emit('hoverChange', details),
    ...props,
  }))

  const [state, send] = useMachine(ratingGroup.machine(context.value), { context })

  return computed(() => ratingGroup.connect(state.value, send, normalizeProps))
}
