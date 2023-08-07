import { computed, defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { useSliderContext } from './slider-context'

export type SliderThumbProps = HTMLArkProps<'div'>

export const SliderThumb: ComponentWithProps<SliderThumbProps> = defineComponent({
  name: 'SliderThumb',
  setup(_, { slots, attrs }) {
    const api = useSliderContext()

    const hiddenInputProps = computed(() => ({
      ...api.value.hiddenInputProps,
      modelValue: api.value.value,
    }))

    return () => (
      <>
        <ark.div {...api.value.thumbProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
        <input {...hiddenInputProps} />
      </>
    )
  },
})
