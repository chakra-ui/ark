import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { usePinInputContext } from './pin-input-context'

export type PinInputInputProps = HTMLArkProps<'input'> & { index: number }

export const PinInputInput: ComponentWithProps<PinInputInputProps> = defineComponent({
  name: 'PinInputInput',
  props: {
    index: {
      type: Number as PropType<PinInputInputProps['index']>,
      required: true,
    },
  },
  setup(props, { attrs }) {
    const api = usePinInputContext()

    const inputProps = computed(() => ({
      ...api.value.getInputProps({ index: props.index }),
      modelValue: api.value.value[props.index] ?? '',
    }))

    return () => <ark.input {...inputProps.value} {...attrs} />
  },
})
