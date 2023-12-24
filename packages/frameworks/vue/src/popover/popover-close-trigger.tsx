import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export interface PopoverCloseTriggerProps extends HTMLArkProps<'button'> {}

export const PopoverCloseTrigger = defineComponent<PopoverCloseTriggerProps>(
  (_, { slots, attrs }) => {
    const api = usePopoverContext()

    return () => (
      <ark.button {...api.value.closeTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'PopoverCloseTrigger',
  },
)
