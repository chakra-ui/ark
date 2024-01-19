import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext, type PresenceProps } from '../presence'
import { emits, props } from '../presence/presence.props'
import type { Assign } from '../types'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerContentProps extends Assign<HTMLArkProps<'div'>, PresenceProps> {}

export const ColorPickerContent = defineComponent<ColorPickerContentProps>(
  (_, { slots, attrs }) => {
    const api = useColorPickerContext()
    const presenceApi = usePresenceContext()

    return () => (
      <>
        {presenceApi.value.isUnmounted ? null : (
          <ark.div {...api.value.contentProps} {...attrs}>
            {slots.default?.()}
          </ark.div>
        )}
      </>
    )
  },
  {
    name: 'ColorPickerContent',
    props,
    emits,
  },
)
