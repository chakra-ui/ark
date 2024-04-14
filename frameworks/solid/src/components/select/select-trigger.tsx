import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectTriggerProps extends HTMLArkProps<'button'> {}

export const SelectTrigger = (props: SelectTriggerProps) => {
  const api = useSelectContext()
  const mergedProps = mergeProps(() => api().triggerProps, props)

  return <ark.button {...mergedProps} />
}
