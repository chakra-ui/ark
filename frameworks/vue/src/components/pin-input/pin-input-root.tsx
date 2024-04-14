import { defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { PinInputProvider } from './pin-input-context'
import { emits, props } from './pin-input.props'
import { type UsePinInputProps, usePinInput } from './use-pin-input'

export interface PinInputRootProps extends Assign<HTMLArkProps<'div'>, UsePinInputProps> {}

export const PinInputRoot = defineComponent<PinInputRootProps>(
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
    name: 'PinInputRoot',
    props,
    emits,
  },
)
