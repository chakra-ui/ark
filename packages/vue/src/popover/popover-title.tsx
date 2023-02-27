import { defineComponent } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, getValidChildren } from '../utils'
import { usePopoverContext } from './popover-context'

export type PopoverTitleProps = HTMLArkProps<'div'>

export const PopoverTitle: ComponentWithProps<PopoverTitleProps> = defineComponent({
  name: 'PopoverTitle',
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()

    return () => (
      <ark.div {...api.value.titleProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
