import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { usePopoverContext } from './popover-context'

export interface PopoverArrowTipProps extends HTMLArkProps<'div'> {}

export const PopoverArrowTip = defineComponent<PopoverArrowTipProps>(
  (_, { slots, attrs }) => {
    const api = usePopoverContext()

    return () => (
      <ark.div {...api.value.arrowTipProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'PopoverArrowTip',
  },
)
