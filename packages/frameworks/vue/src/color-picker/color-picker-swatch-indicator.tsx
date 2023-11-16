import { type SwatchProps } from '@zag-js/color-picker'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerSwatchIndicatorProps = Assign<HTMLArkProps<'div'>, SwatchProps>

export const ColorPickerSwatchIndicator = defineComponent({
  name: 'ColorPickerSwatchIndicator',
  props: {
    value: {
      type: [String, Object] as PropType<SwatchProps['value']>,
      required: true,
    },
    respectAlpha: {
      type: [String, Object] as PropType<SwatchProps['respectAlpha']>,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useColorPickerContext()

    return () => (
      <ark.div {...api.value.getSwatchIndicatorProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
