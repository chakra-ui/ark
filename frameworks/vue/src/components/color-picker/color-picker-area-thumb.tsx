import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerAreaPropsContext } from './use-color-picker-area-props-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerAreaThumbProps extends HTMLArkProps<'div'> {}

export const ColorPickerAreaThumb = defineComponent<ColorPickerAreaThumbProps>(
  (_, { slots, attrs }) => {
    const api = useColorPickerContext()
    const areaProps = useColorPickerAreaPropsContext()

    return () => (
      <ark.div {...api.value.getAreaThumbProps(areaProps)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ColorPickerAreaThumb',
  },
)
