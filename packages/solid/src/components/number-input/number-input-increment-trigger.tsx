import type { IncrementTriggerState } from '@zag-js/number-input'
import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useNumberInputContext } from './use-number-input-context.ts'

export interface NumberInputIncrementTriggerState extends IncrementTriggerState {}

export interface NumberInputIncrementTriggerBaseProps extends PolymorphicProps<
  'button',
  NumberInputIncrementTriggerState
> {}
export interface NumberInputIncrementTriggerProps extends HTMLProps<'button'>, NumberInputIncrementTriggerBaseProps {}

export const NumberInputIncrementTrigger = (props: NumberInputIncrementTriggerProps) => {
  const api = useNumberInputContext()
  const mergedProps = mergeProps(() => api().getIncrementTriggerProps(), props)

  return <ark.button {...mergedProps} state={api().getIncrementTriggerState()} />
}
