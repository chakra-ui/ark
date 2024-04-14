import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import type { Assign } from '~/types'
import { NumberInputProvider } from './number-input-context'
import { emits, props } from './number-input.props'
import { type UseNumberInputProps, useNumberInput } from './use-number-input'

export interface NumberInputRootProps extends Assign<HTMLArkProps<'div'>, UseNumberInputProps> {}

export const NumberInputRoot = defineComponent<NumberInputRootProps>(
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
    name: 'NumberInputRoot',
    props,
    emits,
  },
)
