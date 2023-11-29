import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { usePopoverContext } from './popover-context'

export type PopoverAnchorProps = HTMLArkProps<'div'>

export const PopoverAnchor: ComponentWithProps<PopoverAnchorProps> = defineComponent({
  name: 'PopoverAnchor',
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()

    return () => (
      <ark.div {...api.value.anchorProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
