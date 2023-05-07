import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxContentProps = HTMLArkProps<'ul'>

export const ComboboxContent = (props: ComboboxContentProps) => {
  const combobox = useComboboxContext()
  const mergedProps = createMemo(() => mergeProps(combobox().contentProps, props))
  return <ark.ul {...mergedProps()} />
}
