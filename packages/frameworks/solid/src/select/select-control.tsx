import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export type SelectControlProps = HTMLArkProps<'div'>

export const SelectControl = (props: SelectControlProps) => {
  const api = useSelectContext()
  const mergedProps = mergeProps(() => api().controlProps, props)

  return <ark.div {...mergedProps} />
}
