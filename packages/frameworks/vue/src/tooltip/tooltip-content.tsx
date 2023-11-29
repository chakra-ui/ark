import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, type PresenceProps } from '../presence'
import { emits, props } from '../presence/presence.props'
import { useTooltipContext } from './tooltip-context'

export type TooltipContentProps = HTMLArkProps<'div'> & PresenceProps

export const TooltipContent = defineComponent({
  name: 'TooltipContent',
  props,
  emits,
  setup(props, { slots, attrs }) {
    const api = useTooltipContext()

    return () => (
      <Presence {...props} present={props.present !== undefined ? props.present : api.value.isOpen}>
        <ark.div {...api.value.contentProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
      </Presence>
    )
  },
})
