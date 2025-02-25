import * as segmentGroup from '@zag-js/radio-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './segment-group.types'

export interface UseSegmentGroupProps
  extends Optional<Omit<segmentGroup.Props, 'dir' | 'getRootNode' | 'value'>, 'id'> {
  /**
   * The v-model value of the segment group
   */
  modelValue?: segmentGroup.Props['value']
}

export interface UseSegmentGroupReturn extends ComputedRef<segmentGroup.Api<PropTypes>> {}

export const useSegmentGroup = (props: UseSegmentGroupProps = {}, emit?: EmitFn<RootEmits>): UseSegmentGroupReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<segmentGroup.Props>(() => ({
    id,
    dir: locale.value.dir,
    value: props.modelValue,
    getRootNode: env?.value.getRootNode,
    onValueChange: (details) => {
      emit?.('valueChange', details)
      emit?.('update:modelValue', details.value)
    },
    ...cleanProps(props),
  }))

  const service = useMachine(segmentGroup.machine, context)
  return computed(() => segmentGroup.connect(service, normalizeProps))
}
