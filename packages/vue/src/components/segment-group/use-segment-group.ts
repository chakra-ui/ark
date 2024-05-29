import * as segmentGroup from '@zag-js/radio-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps, useId } from '../../utils'
import type { RootEmits } from './segment-group.types'

export interface UseSegmentGroupProps
  extends Optional<Omit<segmentGroup.Context, 'dir' | 'getRootNode' | 'value'>, 'id'> {
  /**
   * The initial value of the segment group when it is first rendered.
   * Use when you do not need to control the state of the segment group.
   */
  defaultValue?: segmentGroup.Context['value']
  modelValue?: segmentGroup.Context['value']
}

export interface UseSegmentGroupReturn extends ComputedRef<segmentGroup.Api<PropTypes>> {}

export const useSegmentGroup = (
  props: UseSegmentGroupProps,
  emit: EmitFn<RootEmits>,
): UseSegmentGroupReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<segmentGroup.Context>(() => ({
    id,
    dir: locale.value.dir,
    value: props.modelValue ?? props.defaultValue,
    getRootNode: env?.value.getRootNode,
    onValueChange: (details) => {
      emit('valueChange', details)
      emit('update:modelValue', details.value)
    },
    ...cleanProps(props),
  }))

  const [state, send] = useMachine(segmentGroup.machine(context.value), { context })

  return computed(() => segmentGroup.connect(state.value, send, normalizeProps))
}
