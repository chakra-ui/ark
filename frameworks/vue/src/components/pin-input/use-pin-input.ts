import * as pinInput from '@zag-js/pin-input'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './pin-input'

export interface UsePinInputProps
  extends Optional<Omit<pinInput.Context, 'dir' | 'getRootNode' | 'value'>, 'id'> {
  /**
   * The initial value of the pin input when it is first rendered.
   * Use when you do not need to control the state of the pin input.
   */
  defaultValue?: pinInput.Context['value']
  modelValue?: pinInput.Context['value']
}

export interface UsePinInputReturn extends ComputedRef<pinInput.Api<PropTypes>> {}

export const usePinInput = (props: UsePinInputProps, emit: EmitFn<RootEmits>) => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<pinInput.Context>(() => ({
    id: id.value,
    dir: locale.value.dir,
    value: props.modelValue ?? props.defaultValue,
    getRootNode: env?.value.getRootNode,
    onValueChange: (details) => {
      emit('valueChange', details)
      emit('update:modelValue', details.value)
    },
    onValueComplete: (details) => emit('valueComplete', details),
    onValueInvalid: (details) => emit('valueInvalid', details),
    ...props,
  }))

  const [state, send] = useMachine(pinInput.machine(context.value), { context })

  return computed(() => pinInput.connect(state.value, send, normalizeProps))
}
