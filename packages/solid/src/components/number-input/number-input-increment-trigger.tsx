import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export interface NumberInputIncrementTriggerProps extends HTMLArkProps<'button'> {}

export const NumberInputIncrementTrigger = (props: NumberInputIncrementTriggerProps) => {
  const api = useNumberInputContext()
  const mergedProps = mergeProps(() => api().incrementTriggerProps, props)

  return <ark.button {...mergedProps} />
}
