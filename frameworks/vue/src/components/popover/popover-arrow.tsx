import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverArrowProps extends HTMLArkProps<'div'> {}

export const PopoverArrow = defineComponent<PopoverArrowProps>(
  (_, { slots, attrs }) => {
    const api = usePopoverContext()

    return () => (
      <ark.div {...api.value.arrowProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'PopoverArrow',
  },
)
