import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren } from '../utils'
import { usePopoverContext } from './popover-context'

export type PopoverIndicatorProps = HTMLArkProps<'div'>

export const PopoverIndicator = defineComponent({
  name: 'PopoverIndicator',
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()

    return () => (
      <ark.div {...api.value.indicatorProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
