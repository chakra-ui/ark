import type { SwatchTriggerProps } from '@zag-js/color-picker'
import { type PropType, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerSwatchTriggerProps
  extends Assign<HTMLArkProps<'button'>, SwatchTriggerProps> {}

export const ColorPickerSwatchTrigger = defineComponent<ColorPickerSwatchTriggerProps>(
  (props, { slots, attrs }) => {
    const api = useColorPickerContext()

    return () => (
      <ark.button {...api.value.getSwatchTriggerProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'ColorPickerSwatchTrigger',
    props: {
      value: {
        type: [String, Object] as PropType<SwatchTriggerProps['value']>,
        required: true,
      },
      disabled: {
        type: [String, Object] as PropType<SwatchTriggerProps['disabled']>,
      },
    },
  },
)
