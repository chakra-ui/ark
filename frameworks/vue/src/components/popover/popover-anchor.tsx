import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { usePopoverContext } from './popover-context'

export interface PopoverAnchorProps extends HTMLArkProps<'div'> {}

export const PopoverAnchor = defineComponent<PopoverAnchorProps>(
  (_, { slots, attrs }) => {
    const api = usePopoverContext()

    return () => (
      <ark.div {...api.value.anchorProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'PopoverAnchor',
  },
)
