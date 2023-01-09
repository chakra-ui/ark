import { defineComponent } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, getValidChildren } from '../utils'
import { useSelectContext } from './select-context'

export type SelectContentProps = HTMLArkProps<'ul'>

export const SelectContent: ComponentWithProps<SelectContentProps> = defineComponent({
  name: 'SelectContent',
  setup(_, { slots, attrs }) {
    const api = useSelectContext()

    return () => (
      <ark.ul {...api.value.contentProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.ul>
    )
  },
})
