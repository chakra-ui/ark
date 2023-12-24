import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { NumberInputProvider } from './number-input-context'
import { emits, props } from './number-input.props'
import { useNumberInput, type UseNumberInputProps } from './use-number-input'

export interface NumberInputProps extends Assign<HTMLArkProps<'div'>, UseNumberInputProps> {}

export const NumberInput = defineComponent<NumberInputProps>(
  (props, { slots, attrs, emit }) => {
    const api = useNumberInput(props, emit)
    NumberInputProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.div>
    )
  },
  {
    name: 'NumberInput',
    props,
    emits,
  },
)
