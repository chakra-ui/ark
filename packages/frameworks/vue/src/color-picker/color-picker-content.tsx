import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, type PresenceProps } from '../presence'
import { emits, props } from '../presence/presence.props'
import { getValidChildren } from '../utils'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerContentProps = HTMLArkProps<'div'> & PresenceProps

export const ColorPickerContent = defineComponent({
  name: 'ColorPickerContent',
  props,
  emits,
  setup(props, { slots, attrs }) {
    const api = useColorPickerContext()

    return () => (
      <Presence {...props} present={props.present !== undefined ? props.present : api.value.isOpen}>
        <ark.div {...api.value.contentProps} {...attrs}>
          {() => getValidChildren(slots)}
        </ark.div>
      </Presence>
    )
  },
})
