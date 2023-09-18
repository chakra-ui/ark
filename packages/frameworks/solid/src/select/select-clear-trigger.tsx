import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export type SelectClearTriggerProps = HTMLArkProps<'button'>

export const SelectClearTrigger = (props: SelectClearTriggerProps) => {
  const api = useSelectContext()
  const mergedProps = mergeProps(() => api().clearTriggerProps, props)

  return <ark.button {...mergedProps} />
}
