import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useSliderContext } from './slider-context'

export type SliderOutputProps = HTMLArkProps<'output'>

export const SliderOutput: ComponentWithProps<SliderOutputProps> = defineComponent({
  name: 'SliderOutput',
  setup(_, { slots, attrs }) {
    const api = useSliderContext()

    return () => (
      <ark.output {...api.value.outputProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.output>
    )
  },
})
