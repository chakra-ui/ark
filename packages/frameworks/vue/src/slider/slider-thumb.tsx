import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSliderContext } from './slider-context'

interface ThumbProps {
  index: number
}

export type SliderThumbProps = Assign<HTMLArkProps<'div'>, ThumbProps>

export const SliderThumb = defineComponent({
  name: 'SliderThumb',
  props: {
    index: {
      type: Number,
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
