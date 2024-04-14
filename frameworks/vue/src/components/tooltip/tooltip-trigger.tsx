import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { useTooltipContext } from './tooltip-context'

export interface TooltipTriggerProps extends HTMLArkProps<'button'> {}

export const TooltipTrigger = defineComponent<TooltipTriggerProps>(
  (_, { slots, attrs }) => {
    const api = useTooltipContext()

    return () => (
      <ark.button {...api.value.triggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'TooltipTrigger',
  },
)
