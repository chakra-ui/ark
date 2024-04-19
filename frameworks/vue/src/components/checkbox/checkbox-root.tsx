import { defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { emits, props } from './checkbox.props'
import { type UseCheckboxProps, useCheckbox } from './use-checkbox'
import { CheckboxProvider } from './use-checkbox-context'

export interface CheckboxRootProps extends Assign<HTMLArkProps<'label'>, UseCheckboxProps> {}

export const CheckboxRoot = defineComponent<CheckboxRootProps>(
  (props, { slots, attrs, emit }) => {
    const api = useCheckbox(props, emit)
    CheckboxProvider(api)

    return () => (
      <ark.label {...api.value.rootProps} {...attrs}>
        {slots.default?.()}
      </ark.label>
    )
  },
  {
    name: 'CheckboxRoot',
    props,
    emits,
  },
)
