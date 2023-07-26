import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export type SelectTriggerProps = HTMLArkProps<'button'>

export const SelectTrigger = (props: SelectTriggerProps) => {
  const api = useSelectContext()
  const triggerProps = mergeProps(() => api().triggerProps, props)
  return <ark.button {...triggerProps} />
}
