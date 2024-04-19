import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverTitleProps extends HTMLArkProps<'div'> {}

export const PopoverTitle = defineComponent<PopoverTitleProps>(
  (_, { slots, attrs }) => {
    const api = usePopoverContext()

    return () => (
      <ark.div {...api.value.titleProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'PopoverTitle',
  },
)
