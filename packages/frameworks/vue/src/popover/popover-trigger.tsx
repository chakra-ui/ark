import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export interface PopoverTriggerProps extends HTMLArkProps<'button'> {}

export const PopoverTrigger = defineComponent<PopoverTriggerProps>(
  (_, { slots, attrs }) => {
    const api = usePopoverContext()

    return () => (
      <ark.button {...api.value.triggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'PopoverTrigger',
  },
)
