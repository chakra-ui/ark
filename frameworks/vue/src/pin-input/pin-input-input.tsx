import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { usePinInputContext } from './pin-input-context'

export interface PinInputInputProps extends Assign<HTMLArkProps<'input'>, { index: number }> {}

export const PinInputInput = defineComponent<PinInputInputProps>(
  (props, { attrs }) => {
    const api = usePinInputContext()

    return () => <ark.input {...api.value.getInputProps({ index: props.index })} {...attrs} />
  },
  {
    name: 'PinInputInput',
    props: {
      index: {
        type: Number as PropType<PinInputInputProps['index']>,
        required: true,
      },
    },
  },
)
