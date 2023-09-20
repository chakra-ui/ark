import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export type SelectIndicatorProps = HTMLArkProps<'div'>

export const SelectIndicator = (props: SelectIndicatorProps) => {
  const api = useSelectContext()
  const mergedProps = mergeProps(() => api().controlProps, props)

  return <ark.div {...mergedProps} />
}
