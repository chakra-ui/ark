import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxControlProps = HTMLArkProps<'div'>

export const ComboboxControl = (props: ComboboxControlProps) => {
  const combobox = useComboboxContext()
  const controlProps = mergeProps(() => combobox().controlProps, props)
  return <ark.div {...controlProps} />
}
