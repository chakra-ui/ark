import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useCheckboxContext } from './use-checkbox-context'

export interface CheckboxControlProps extends HTMLArkProps<'div'> {}

export const CheckboxControl = defineComponent<CheckboxControlProps>(
  (_, { attrs, slots }) => {
    const api = useCheckboxContext()

    return () => (
      <>
        <ark.div {...api.value.controlProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
        <input {...api.value.hiddenInputProps} />
      </>
    )
  },
  {
    name: 'CheckboxControl',
  },
)
