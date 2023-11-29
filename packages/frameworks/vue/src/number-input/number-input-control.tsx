import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputControlProps = HTMLArkProps<'div'>

export const NumberInputControl = defineComponent({
  name: 'NumberInputControl',
  setup(_, { slots, attrs }) {
    const api = useNumberInputContext()

    return () => (
      <ark.div {...api.value.controlProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
