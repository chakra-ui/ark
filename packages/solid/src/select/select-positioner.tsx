import { ark, HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export type SelectPositionerProps = HTMLArkProps<'div'>

export const SelectPositioner = (props: SelectPositionerProps) => {
  const select = useSelectContext()

  return <ark.div {...select().positionerProps} {...props} />
}
