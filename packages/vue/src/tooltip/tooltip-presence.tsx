import { defineComponent } from 'vue'
import { type HTMLArkProps } from '../factory'
import { Presence } from '../presence'
import { useTooltipContext } from './tooltip-context'

export type TooltipPresenceProps = HTMLArkProps<'div'>

export const TooltipPresence = defineComponent({
  name: 'TooltipPresence',
  setup(_, { slots, attrs }) {
    const api = useTooltipContext()

    // present={present !== undefined ? present : isOpen} {...rest}
    return () => (
      <Presence present={api.value.isOpen} {...attrs}>
        {slots.default?.()}
      </Presence>
    )
  },
})
