import { defineComponent } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, getValidChildren } from '../utils'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderOutputProps = HTMLArkProps<'output'>

export const RangeSliderOutput: ComponentWithProps<RangeSliderOutputProps> = defineComponent({
  name: 'RangeSliderOutput',
  setup(_, { slots, attrs, expose }) {
    const api = useRangeSliderContext()

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
