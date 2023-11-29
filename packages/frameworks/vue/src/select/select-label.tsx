import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export type SelectLabelProps = HTMLArkProps<'label'>

export const SelectLabel = defineComponent({
  name: 'SelectLabel',
  setup(_, { slots, attrs }) {
    const api = useSelectContext()

    return () => (
      <ark.label {...api.value.labelProps} {...attrs}>
        {slots.default?.()}
      </ark.label>
    )
  },
})
