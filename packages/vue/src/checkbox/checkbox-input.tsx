import { defineComponent } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, getValidChildren } from '../utils'
import { useCheckboxContext } from './checkbox-context'

export type CheckboxInputProps = HTMLArkProps<'input'>

export const CheckboxInput: ComponentWithProps<CheckboxInputProps> = defineComponent({
  name: 'CheckboxInput',
  setup(_, { attrs, slots }) {
    const api = useCheckboxContext()

    return () => (
      <ark.input {...api.value.inputProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.input>
    )
  },
})
