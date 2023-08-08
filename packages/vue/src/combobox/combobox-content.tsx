import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useComboboxContext } from './combobox-context'

export type ComboboxContentProps = HTMLArkProps<'div'>

export const ComboboxContent: ComponentWithProps<ComboboxContentProps> = defineComponent({
  name: 'ComboboxContent',
  setup(_, { slots, attrs }) {
    const api = useComboboxContext()

    return () => (
      <ark.div {...api.value.contentProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
