import { defineComponent } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, getValidChildren } from '../utils'
import { useSliderContext } from './slider-context'

export type SliderOutputProps = HTMLArkProps<'output'>

export const SliderOutput: ComponentWithProps<SliderOutputProps> = defineComponent({
  name: 'SliderOutput',
  setup(_, { slots, attrs, expose }) {
    const api = useSliderContext()

    expose({
      context: api.value,
    })

    return () => (
      <ark.output {...api.value.outputProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.output>
    )
  },
})
