import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxPositionerProps = HTMLArkProps<'div'>

export const ComboboxPositioner = (props: ComboboxPositionerProps) => {
  const combobox = useComboboxContext()
  const positionProps = mergeProps(() => combobox().positionerProps, props)
  return <ark.div {...positionProps} />
}
