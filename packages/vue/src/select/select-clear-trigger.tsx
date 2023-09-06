import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export type SelectClearTriggerProps = HTMLArkProps<'button'>

export const SelectClearTrigger = defineComponent({
  name: 'SelectClearTrigger',
  setup(_, { slots, attrs }) {
    const api = useSelectContext()

    return () => (
      <ark.button {...api.value.clearTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})
