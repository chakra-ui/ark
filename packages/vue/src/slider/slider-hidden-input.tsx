import { computed, defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { useSliderContext } from './slider-context'

export type SliderHiddenInputProps = HTMLArkProps<'input'>

export const SliderHiddenInput: ComponentWithProps<SliderHiddenInputProps> = defineComponent({
  name: 'SliderHiddenInput',
  setup(_, { attrs }) {
    const api = useSliderContext()
    const hiddenInputProps = computed(() => ({
      ...api.value.hiddenInputProps,
      modelValue: api.value.value,
    }))

    return () => <ark.input {...hiddenInputProps} {...attrs} />
  },
})
