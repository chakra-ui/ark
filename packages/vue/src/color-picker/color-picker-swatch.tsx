import { type ColorSwatchProps } from '@zag-js/color-picker'
import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useColorPickerContext } from './color-picker-context'
import { ColorPickerSwatchProvider } from './color-picker-swatch-context'

export type ColorPickerSwatchProps = Assign<HTMLArkProps<'button'>, ColorSwatchProps>

export const ColorPickerSwatch = defineComponent({
  name: 'ColorPickerSwatch',
  props: {
    readOnly: {
      type: Boolean as PropType<ColorPickerSwatchProps['readOnly']>,
    },
    value: {
      type: [String, Object] as PropType<ColorPickerSwatchProps['value']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const swatchProps = computed<ColorSwatchProps>(() => ({
      value: props.value,
      readOnly: props.readOnly,
    }))
    const api = useColorPickerContext()

    ColorPickerSwatchProvider(swatchProps)

    return () => (
      <ark.button
        {...api.value.getSwatchProps(swatchProps.value)}
        disabled={swatchProps.value.readOnly}
        {...attrs}
      >
        {slots.default?.()}
      </ark.button>
    )
  },
})
