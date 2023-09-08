import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren } from '../utils'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderLabelProps = HTMLArkProps<'label'>

export const RangeSliderLabel = defineComponent({
  name: 'RangeSliderLabel',
  setup(_, { slots, attrs }) {
    const api = useRangeSliderContext()

    return () => (
      <ark.label {...api.value.labelProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.label>
    )
  },
})
