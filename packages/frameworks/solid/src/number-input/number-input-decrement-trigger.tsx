import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputDecrementTriggerProps = HTMLArkProps<'button'>

export const NumberInputDecrementTrigger = (props: NumberInputDecrementTriggerProps) => {
  const api = useNumberInputContext()
  const triggerProps = mergeProps(() => api().decrementTriggerProps, props)
  return <ark.button {...triggerProps} />
}
