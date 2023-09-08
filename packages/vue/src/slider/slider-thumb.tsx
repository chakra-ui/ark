import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderThumbProps = HTMLArkProps<'div'>

export const SliderThumb = defineComponent({
  name: 'SliderThumb',
  setup(_, { slots, attrs }) {
    const api = useSliderContext()

    return () => (
      <>
        <ark.div {...api.value.thumbProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
        <input {...api.value.hiddenInputProps} />
      </>
    )
  },
})
