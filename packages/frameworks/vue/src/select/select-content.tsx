import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, type PresenceProps } from '../presence'
import { emits, props } from '../presence/presence.props'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'

export interface SelectContentProps extends Assign<HTMLArkProps<'div'>, PresenceProps> {}

export const SelectContent = defineComponent({
  name: 'SelectContent',
  props,
  emits,
  setup(props, { slots, attrs }) {
    const api = useSelectContext()

    return () => (
      <Presence {...props} present={props.present !== undefined ? props.present : api.value.isOpen}>
        <ark.div {...api.value.contentProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
      </Presence>
    )
  },
})
