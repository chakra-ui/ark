import type { ColorSwatchProps } from '@zag-js/color-picker'
import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerSwatchProps = HTMLArkProps<'button'> & ColorSwatchProps

export const ColorPickerSwatch: ComponentWithProps<ColorPickerSwatchProps> = defineComponent({
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
  setup(props, { attrs }) {
    const swatchProps = computed<ColorSwatchProps>(() => ({
      value: props.value,
      readOnly: props.readOnly,
    }))
    const rootContext = useColorPickerContext()

    return () => (
      <ark.button
        {...rootContext.value.getSwatchProps(swatchProps.value)}
        disabled={swatchProps.value.readOnly}
        {...attrs}
      >
        <ark.div {...rootContext.value.getSwatchBackgroundProps(swatchProps.value)} />
      </ark.button>
    )
  },
})
