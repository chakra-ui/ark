import { computed, defineComponent, PropType } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { usePinInputContext } from './pin-input-context'

export type PinInputFieldProps = HTMLArkProps<'input'> & { index: number }

export const PinInputField: ComponentWithProps<PinInputFieldProps> = defineComponent({
  name: 'PinInputField',
  props: {
    index: {
      type: Number as PropType<PinInputFieldProps['index']>,
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
