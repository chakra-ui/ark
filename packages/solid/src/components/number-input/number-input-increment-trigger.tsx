import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export interface NumberInputIncrementTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface NumberInputIncrementTriggerProps
  extends HTMLProps<'button'>,
    NumberInputIncrementTriggerBaseProps {}

export const NumberInputIncrementTrigger = (props: NumberInputIncrementTriggerProps) => {
  const api = useNumberInputContext()
  const mergedProps = mergeProps(() => api().getIncrementTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
