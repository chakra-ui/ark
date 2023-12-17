import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, type PresenceProps } from '../presence'
import { emits, props } from '../presence/presence.props'
import { usePopoverContext } from './popover-context'

export interface PopoverContentProps extends HTMLArkProps<'div'>, PresenceProps {}

export const PopoverContent = defineComponent({
  name: 'PopoverContent',
  props,
  emits,
  setup(props, { slots, attrs }) {
    const api = usePopoverContext()

    return () => (
      <Presence {...props} present={props.present !== undefined ? props.present : api.value.isOpen}>
        <ark.div {...api.value.contentProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
      </Presence>
    )
  },
})
