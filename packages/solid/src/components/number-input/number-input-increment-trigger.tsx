import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export interface NumberInputIncrementTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface NumberInputIncrementTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    NumberInputIncrementTriggerBaseProps {}

export const NumberInputIncrementTrigger = (props: NumberInputIncrementTriggerProps) => {
  const api = useNumberInputContext()
  const mergedProps = mergeProps(() => api().getIncrementTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
