import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { useCheckboxContext } from './checkbox-context'

export type CheckboxLabelProps = HTMLArkProps<'span'>

export const CheckboxLabel: ComponentWithProps<CheckboxLabelProps> = defineComponent({
  name: 'CheckboxLabel',
  setup(_, { attrs, slots }) {
    const api = useCheckboxContext()

    return () => (
      <ark.span {...api.value.labelProps} {...attrs}>
        {slots.default?.()}
      </ark.span>
    )
  },
})
