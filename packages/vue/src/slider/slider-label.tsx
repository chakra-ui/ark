import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useSliderContext } from './slider-context'

export type SliderLabelProps = HTMLArkProps<'label'>

export const SliderLabel: ComponentWithProps<SliderLabelProps> = defineComponent({
  name: 'SliderLabel',
  setup(_, { slots, attrs }) {
    const api = useSliderContext()

    return () => (
      <ark.label {...api.value.labelProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.label>
    )
  },
})
