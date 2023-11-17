import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerAreaContext } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerAreaBackgroundProps extends HTMLArkProps<'div'> {}

export const ColorPickerAreaBackground = defineComponent({
  name: 'ColorPickerAreaBackground',
  setup(_, { slots, attrs }) {
    const api = useColorPickerContext()
    const areaProps = useColorPickerAreaContext()

    return () => (
      <ark.div {...api.value.getAreaBackgroundProps(areaProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
