import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderThumbProps = HTMLArkProps<'div'> & { index: number }

export const RangeSliderThumb: ComponentWithProps<RangeSliderThumbProps> = defineComponent({
  name: 'RangeSliderThumb',
  props: {
    index: {
      type: Number as PropType<RangeSliderThumbProps['index']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useRangeSliderContext()

    return () => (
      <>
        <ark.div {...api.value.getThumbProps(props.index)} {...attrs}>
          {slots.default?.()}
        </ark.div>
        <input {...api.value.getHiddenInputProps(props.index)} />
      </>
    )
  },
})
