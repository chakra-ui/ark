import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderHiddenInputProps = HTMLArkProps<'div'> & { index: number }

export const RangeSliderHiddenInput: ComponentWithProps<RangeSliderHiddenInputProps> =
  defineComponent({
    name: 'RangeSliderHiddenInput',
    props: {
      index: {
        type: Number as PropType<RangeSliderHiddenInputProps['index']>,
        required: true,
      },
    },
    setup(props, { attrs }) {
      const api = useRangeSliderContext()

      return () => <ark.input {...api.value.getHiddenInputProps(props.index)} {...attrs} />
    },
  })
