import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { CheckboxProvider } from './checkbox-context'
import { emits, props } from './checkbox.props'
import { useCheckbox, type UseCheckboxProps } from './use-checkbox'

export interface CheckboxRootProps extends Assign<HTMLArkProps<'label'>, UseCheckboxProps> {}

export const CheckboxRoot = defineComponent<CheckboxRootProps>(
  (props, { slots, attrs, emit }) => {
    const api = useCheckbox(props, emit)
    CheckboxProvider(api)

    return () => (
      <ark.label {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.label>
    )
  },
  {
    name: 'CheckboxRoot',
    props,
    emits,
  },
)
