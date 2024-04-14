import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useSelectContext } from './select-context'

export interface SelectLabelProps extends HTMLArkProps<'label'> {}

export const SelectLabel = defineComponent<SelectLabelProps>(
  (_, { slots, attrs }) => {
    const api = useSelectContext()

    return () => (
      <ark.label {...api.value.labelProps} {...attrs}>
        {slots.default?.()}
      </ark.label>
    )
  },
  {
    name: 'SelectLabel',
  },
)
