import type { ThumbProps } from '@zag-js/slider'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSliderContext } from './slider-context'

export interface SliderThumbProps extends Assign<HTMLArkProps<'div'>, ThumbProps> {}

export const SliderThumb = defineComponent<SliderThumbProps>(
  (props, { slots, attrs }) => {
    const api = useSliderContext()

    return () => (
      <>
        <ark.div {...api.value.getThumbProps(props)} {...attrs}>
          {slots.default?.()}
        </ark.div>
        <input {...api.value.getHiddenInputProps(props)} />
      </>
    )
  },
  {
    name: 'SliderThumb',
    props: {
      index: {
        type: Number as PropType<ThumbProps['index']>,
        required: true,
      },
      name: {
        type: String as PropType<ThumbProps['name']>,
      },
    },
  },
)
