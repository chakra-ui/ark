import { defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { type PresenceProps, usePresenceContext } from '../presence'
import { emits, props } from '../presence/presence.props'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerContentProps extends Assign<HTMLArkProps<'div'>, PresenceProps> {}

export const ColorPickerContent = defineComponent<ColorPickerContentProps>(
  (_, { slots, attrs }) => {
    const api = useColorPickerContext()
    const presenceApi = usePresenceContext()

    return () =>
      presenceApi.value.isUnmounted ? null : (
        <ark.div {...api.value.contentProps} {...presenceApi.value.presenceProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
      )
  },
  {
    name: 'ColorPickerContent',
    props,
    emits,
  },
)
