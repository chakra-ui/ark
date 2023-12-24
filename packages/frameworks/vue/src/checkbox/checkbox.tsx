import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { CheckboxProvider } from './checkbox-context'
import { emits, props } from './checkbox.props'
import { useCheckbox, type UseCheckboxProps } from './use-checkbox'

export interface CheckboxProps extends Assign<HTMLArkProps<'label'>, UseCheckboxProps> {}

export const Checkbox = defineComponent<CheckboxProps>(
  (props, { slots, attrs, emit }) => {
    const api = useCheckbox(emit, props)
    CheckboxProvider(api)

    return () => (
      <ark.label {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.label>
    )
  },
  {
    name: 'Checkbox',
    props,
    emits,
  },
)
