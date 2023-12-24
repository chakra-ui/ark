import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { PinInputProvider } from './pin-input-context'
import { emits, props } from './pin-input.props'
import { usePinInput, type UsePinInputProps } from './use-pin-input'

export interface PinInputProps extends Assign<HTMLArkProps<'div'>, UsePinInputProps> {}

export const PinInput = defineComponent<PinInputProps>(
  (props, { slots, attrs, emit }) => {
    const api = usePinInput(props, emit)
    PinInputProvider(api)

    return () => (
      <>
        <ark.div {...api.value.rootProps} {...attrs}>
          {slots.default?.(api.value)}
        </ark.div>
        <input {...api.value.hiddenInputProps} />
      </>
    )
  },
  {
    name: 'PinInput',
    props,
    emits,
  },
)
