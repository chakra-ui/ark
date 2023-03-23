import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useComboboxContext } from './combobox-context'

export type ComboboxContentProps = HTMLArkProps<'ul'>

export const ComboboxContent: ComponentWithProps<ComboboxContentProps> = defineComponent({
  name: 'ComboboxContent',
  setup(_, { slots, attrs }) {
    const api = useComboboxContext()

    return () => (
      <ark.ul {...api.value.contentProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.ul>
    )
  },
})
