import * as checkbox from '@zag-js/checkbox'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './checkbox'

export interface UseCheckboxProps
  extends Optional<Omit<checkbox.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The checked state of the checkbox when it is first rendered.
   * Use this when you do not need to control the state of the checkbox.
   */
  defaultChecked?: checkbox.Context['checked']
}

export interface UseCheckboxReturn extends ComputedRef<checkbox.Api<PropTypes>> {}

export const useCheckbox = (props: UseCheckboxProps, emit: EmitFn<RootEmits>) => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed(() => {
    const { checked, defaultChecked, ...rest } = props
    return {
      ...rest,
      checked: checked ?? defaultChecked,
    }
  })

  const [state, send] = useMachine(
    checkbox.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      dir: locale.value.dir,
      getRootNode: env?.value.getRootNode,
      checked: props.checked ?? props.defaultChecked,
      onCheckedChange(details) {
        emit('checkedChange', details)
        emit('update:checked', details.checked)
      },
    }),
    { context },
  )

  return computed(() => checkbox.connect(state.value, send, normalizeProps))
}
