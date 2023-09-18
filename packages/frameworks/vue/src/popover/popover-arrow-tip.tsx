import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { usePopoverContext } from './popover-context'

export type PopoverArrowTipProps = HTMLArkProps<'div'>

export const PopoverArrowTip: ComponentWithProps<PopoverArrowTipProps> = defineComponent({
  name: 'PopoverArrowTip',
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()

    return () => (
      <ark.div {...api.value.arrowTipProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
