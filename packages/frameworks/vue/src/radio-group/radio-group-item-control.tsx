import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren } from '../utils'
import { useRadioGroupContext } from './radio-group-context'
import { useRadioGroupItemContext } from './radio-group-item-context'

export type RadioGroupItemControlProps = HTMLArkProps<'div'>

export const RadioGroupItemControl = defineComponent({
  name: 'RadioGroupItemControl',
  setup(_, { slots, attrs }) {
    const api = useRadioGroupContext()
    const itemProps = useRadioGroupItemContext()

    return () => (
      <>
        <ark.div {...api.value.getItemControlProps(itemProps.value)} {...attrs}>
          {() => getValidChildren(slots)}
        </ark.div>
        <input {...api.value.getItemHiddenInputProps(itemProps.value)} />
      </>
    )
  },
})
