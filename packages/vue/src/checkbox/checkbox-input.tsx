import { defineComponent, reactive } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, getValidChildren } from '../utils'
import { useCheckboxContext } from './checkbox-context'

export type CheckboxInputProps = HTMLArkProps<'input'>

export const CheckboxInput: ComponentWithProps<CheckboxInputProps> = defineComponent({
  name: 'CheckboxInput',
  setup(_, { attrs, slots }) {
    const api = useCheckboxContext()

    const inputProps = reactive({
      ...api.value.inputProps,
      modelValue: api.value.isChecked,
    })

    return () => (
      <ark.input {...inputProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.input>
    )
  },
})
