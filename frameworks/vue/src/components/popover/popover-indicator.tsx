import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverIndicatorProps extends HTMLArkProps<'div'> {}

export const PopoverIndicator = defineComponent<PopoverIndicatorProps>(
  (_, { slots, attrs }) => {
    const api = usePopoverContext()

    return () => (
      <ark.div {...api.value.indicatorProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'PopoverIndicator',
  },
)
