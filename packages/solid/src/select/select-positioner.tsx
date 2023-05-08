import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export type SelectPositionerProps = HTMLArkProps<'div'>

export const SelectPositioner = (props: SelectPositionerProps) => {
  const api = useSelectContext()
  const positionerProps = mergeProps(() => api().positionerProps, props)
  return <ark.div {...positionerProps} />
}
