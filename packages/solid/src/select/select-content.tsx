import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export type SelectContentProps = HTMLArkProps<'ul'>

export const SelectContent = (props: SelectContentProps) => {
  const api = useSelectContext()
  const contentProps = mergeProps(() => api().contentProps, props)
  return <ark.ul {...contentProps} />
}
