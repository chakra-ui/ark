import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

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
