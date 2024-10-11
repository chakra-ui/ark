import * as zagSwitch from '@zag-js/switch'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import { useFieldContext } from '../field'
import type { RootEmits } from './switch'

export interface UseSwitchProps
  extends Optional<Omit<zagSwitch.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The checked state of the switch when it is first rendered.
   * Use this when you do not need to control the state of the switch.
   */
  defaultChecked?: zagSwitch.Context['checked']
}

export interface UseSwitchReturn extends ComputedRef<zagSwitch.Api<PropTypes>> {}

export const useSwitch = (props: UseSwitchProps, emit?: EmitFn<RootEmits>): UseSwitchReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const field = useFieldContext()

  const context = computed<zagSwitch.Context>(() => ({
    id,
    ids: {
      label: field?.value.ids.label,
      hiddenInput: field?.value.ids.control,
    },
    disabled: field?.value.disabled,
    readOnly: field?.value.readOnly,
    invalid: field?.value.invalid,
    required: field?.value.required,
    dir: locale.value.dir,
    checked: props.defaultChecked,
    getRootNode: env?.value.getRootNode,
    onCheckedChange(details) {
      emit?.('checkedChange', details)
      emit?.('update:checked', details.checked)
    },
    ...cleanProps(props),
  }))

  const [state, send] = useMachine(zagSwitch.machine(context.value), { context })

  return computed(() => zagSwitch.connect(state.value, send, normalizeProps))
}
