import { defineComponent } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, getValidChildren } from '../utils'
import { usePopoverContext } from './popover-context'

export type PopoverArrowProps = HTMLArkProps<'div'>

export const PopoverArrow: ComponentWithProps<PopoverArrowProps> = defineComponent({
  name: 'PopoverArrow',
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()

    return () => (
      <ark.div {...api.value.arrowProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
