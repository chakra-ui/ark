import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export interface NumberInputDecrementTriggerProps extends HTMLArkProps<'button'> {}

export const NumberInputDecrementTrigger = (props: NumberInputDecrementTriggerProps) => {
  const api = useNumberInputContext()
  const mergedProps = mergeProps(() => api().decrementTriggerProps, props)

  return <ark.button {...mergedProps} />
}
