import type { ThumbProps } from '@zag-js/slider'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSliderContext } from './slider-context'

export type SliderThumbProps = Assign<HTMLArkProps<'div'>, ThumbProps>

export const SliderThumb = defineComponent({
  name: 'SliderThumb',
  props: {
    index: {
      type: Number as PropType<ThumbProps['index']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
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
})
