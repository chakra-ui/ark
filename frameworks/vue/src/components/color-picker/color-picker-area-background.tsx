import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerAreaContext } from './use-color-picker-area-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerAreaBackgroundProps extends HTMLArkProps<'div'> {}

export const ColorPickerAreaBackground = defineComponent<ColorPickerAreaBackgroundProps>(
  (_, { slots, attrs }) => {
    const api = useColorPickerContext()
    const areaProps = useColorPickerAreaContext()

    return () => (
      <ark.div {...api.value.getAreaBackgroundProps(areaProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ColorPickerAreaBackground',
  },
)
