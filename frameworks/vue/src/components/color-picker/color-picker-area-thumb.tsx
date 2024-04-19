import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerAreaContext } from './use-color-picker-area-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerAreaThumbProps extends HTMLArkProps<'div'> {}

export const ColorPickerAreaThumb = defineComponent<ColorPickerAreaThumbProps>(
  (_, { slots, attrs }) => {
    const api = useColorPickerContext()
    const areaProps = useColorPickerAreaContext()

    return () => (
      <ark.div {...api.value.getAreaThumbProps(areaProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ColorPickerAreaThumb',
  },
)
