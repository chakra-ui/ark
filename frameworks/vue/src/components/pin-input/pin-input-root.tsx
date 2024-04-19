import { defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { emits, props } from './pin-input.props'
import { type UsePinInputProps, usePinInput } from './use-pin-input'
import { PinInputProvider } from './use-pin-input-context'

export interface PinInputRootProps extends Assign<HTMLArkProps<'div'>, UsePinInputProps> {}

export const PinInputRoot = defineComponent<PinInputRootProps>(
  (props, { slots, attrs, emit }) => {
    const api = usePinInput(props, emit)
    PinInputProvider(api)

    return () => (
      <>
        <ark.div {...api.value.rootProps} {...attrs}>
          {slots.default?.()}
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
