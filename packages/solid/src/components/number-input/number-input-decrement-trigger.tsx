import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export interface NumberInputDecrementTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface NumberInputDecrementTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    NumberInputDecrementTriggerBaseProps {}

export const NumberInputDecrementTrigger = (props: NumberInputDecrementTriggerProps) => {
  const api = useNumberInputContext()
  const mergedProps = mergeProps(() => api().getDecrementTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
