import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderOutputProps = HTMLArkProps<'output'>

export const RangeSliderOutput: ComponentWithProps<RangeSliderOutputProps> = defineComponent({
  name: 'RangeSliderOutput',
  setup(_, { slots, attrs }) {
    const api = useRangeSliderContext()

    return () => (
      <ark.output {...api.value.outputProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.output>
    )
  },
})
