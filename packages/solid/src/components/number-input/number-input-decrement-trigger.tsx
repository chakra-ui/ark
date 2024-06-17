import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export interface NumberInputDecrementTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface NumberInputDecrementTriggerProps
  extends HTMLProps<'button'>,
    NumberInputDecrementTriggerBaseProps {}

export const NumberInputDecrementTrigger = (props: NumberInputDecrementTriggerProps) => {
  const api = useNumberInputContext()
  const mergedProps = mergeProps(() => api().getDecrementTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
