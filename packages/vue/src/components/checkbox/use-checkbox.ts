import * as checkbox from '@zag-js/checkbox'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps, useId } from '../../utils'
import type { RootEmits } from './checkbox'
import { useCheckboxGroupContext } from './use-checkbox-group-context'

export interface UseCheckboxProps
  extends Optional<Omit<checkbox.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The checked state of the checkbox when it is first rendered.
   * Use this when you do not need to control the state of the checkbox.
   */
  defaultChecked?: checkbox.Context['checked']
}

export interface UseCheckboxReturn extends ComputedRef<checkbox.Api<PropTypes>> {}

export const useCheckbox = (ownProps: UseCheckboxProps, emit?: EmitFn<RootEmits>) => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const checkboxGroup = useCheckboxGroupContext()
  const props = computed(() => {
    return mergeProps(ownProps, checkboxGroup?.value.getItemProps({ value: ownProps.value }) ?? {})
  })

  const context = computed<checkbox.Context>(() => ({
    id,
    dir: locale.value.dir,
    checked: props.value.defaultChecked,
    getRootNode: env?.value.getRootNode,
    onCheckedChange(details) {
      emit?.('checkedChange', details)
      emit?.('update:checked', details.checked)
    },
    ...cleanProps(props.value),
  }))

  const [state, send] = useMachine(checkbox.machine(context.value), { context })

  return computed(() => checkbox.connect(state.value, send, normalizeProps))
}
