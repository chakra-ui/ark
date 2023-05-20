import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxContentProps = HTMLArkProps<'ul'>

export const ComboboxContent = (props: ComboboxContentProps) => {
  const combobox = useComboboxContext()
  const contentProps = mergeProps(() => combobox().contentProps, props)
  return <ark.ul {...contentProps} />
}
