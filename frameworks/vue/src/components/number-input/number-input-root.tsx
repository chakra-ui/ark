import { defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { emits, props } from './number-input.props'
import { type UseNumberInputProps, useNumberInput } from './use-number-input'
import { NumberInputProvider } from './use-number-input-context'

export interface NumberInputRootProps extends Assign<HTMLArkProps<'div'>, UseNumberInputProps> {}

export const NumberInputRoot = defineComponent<NumberInputRootProps>(
  (props, { slots, attrs, emit }) => {
    const api = useNumberInput(props, emit)
    NumberInputProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'NumberInputRoot',
    props,
    emits,
  },
)
