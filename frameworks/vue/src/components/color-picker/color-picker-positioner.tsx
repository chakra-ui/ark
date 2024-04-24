import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerPositionerProps extends HTMLArkProps<'div'> {}

export const ColorPickerPositioner = defineComponent<ColorPickerPositionerProps>(
  (_, { slots, attrs }) => {
    const api = useColorPickerContext()
    const presenceApi = usePresenceContext()

    return () =>
      presenceApi.value.unmounted ? null : (
        <ark.div {...api.value.positionerProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
      )
  },
  {
    name: 'ColorPickerPositioner',
  },
)
