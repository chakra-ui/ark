import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useRadioGroupContext } from './radio-group-context'
import { useRadioGroupItemContext } from './radio-group-item-context'

export interface RadioGroupItemControlProps extends HTMLArkProps<'div'> {}

export const RadioGroupItemControl = defineComponent<RadioGroupItemControlProps>(
  (_, { slots, attrs }) => {
    const api = useRadioGroupContext()
    const itemProps = useRadioGroupItemContext()

    return () => (
      <>
        <ark.div {...api.value.getItemControlProps(itemProps.value)} {...attrs}>
          {slots.default?.()}
        </ark.div>
        <input {...api.value.getItemHiddenInputProps(itemProps.value)} />
      </>
    )
  },
  {
    name: 'RadioGroupItemControl',
  },
)
