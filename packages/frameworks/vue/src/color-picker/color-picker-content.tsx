import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, type PresenceProps } from '../presence'
import { emits, props } from '../presence/presence.props'
import type { Assign } from '../types'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerContentProps extends Assign<HTMLArkProps<'div'>, PresenceProps> {}

export const ColorPickerContent = defineComponent<ColorPickerContentProps>(
  (props, { slots, attrs }) => {
    const api = useColorPickerContext()

    return () => (
      <Presence {...props} present={props.present !== undefined ? props.present : api.value.isOpen}>
        <ark.div {...api.value.contentProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
      </Presence>
    )
  },
  {
    name: 'ColorPickerContent',
    props,
    emits,
  },
)
