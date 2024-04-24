import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'
import { useRadioGroupItemPropsContext } from './use-radio-group-item-props-context'

export interface RadioGroupItemControlProps extends HTMLArkProps<'div'> {}

export const RadioGroupItemControl = defineComponent<RadioGroupItemControlProps>(
  (_, { slots, attrs }) => {
    const api = useRadioGroupContext()
    const itemProps = useRadioGroupItemPropsContext()

    return () => (
      <>
        <ark.div {...api.value.getItemControlProps(itemProps)} {...attrs}>
          {slots.default?.()}
        </ark.div>
        <input {...api.value.getItemHiddenInputProps(itemProps)} />
      </>
    )
  },
  {
    name: 'RadioGroupItemControl',
  },
)
