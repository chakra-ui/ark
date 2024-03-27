import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export interface ComboboxControlProps extends HTMLArkProps<'div'> {}

export const ComboboxControl = (props: ComboboxControlProps) => {
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(() => combobox().controlProps, props)

  return <ark.div {...mergedProps} />
}
