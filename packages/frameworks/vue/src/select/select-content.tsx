import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, type PresenceProps } from '../presence'
import { emits, props } from '../presence/presence.props'
import { getValidChildren } from '../utils'
import { useSelectContext } from './select-context'

export type SelectContentProps = HTMLArkProps<'div'> & PresenceProps

export const SelectContent = defineComponent({
  name: 'SelectContent',
  props,
  emits,
  setup(props, { slots, attrs }) {
    const api = useSelectContext()

    return () => (
      <Presence {...props} present={props.present !== undefined ? props.present : api.value.isOpen}>
        <ark.div {...api.value.contentProps} {...attrs}>
          {() => getValidChildren(slots)}
        </ark.div>
      </Presence>
    )
  },
})
