import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxPositionerProps = HTMLArkProps<'div'>

export const ComboboxPositioner = (props: ComboboxPositionerProps) => {
  const combobox = useComboboxContext()

  return <ark.div {...combobox().positionerProps} {...props} />
}
