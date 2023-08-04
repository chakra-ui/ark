import type { OptionGroupProps } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useComboboxContext } from './combobox-context'

export type ComboboxOptionGroupProps = Assign<HTMLArkProps<'ul'>, OptionGroupProps>

export const ComboboxOptionGroup = (props: ComboboxOptionGroupProps) => {
  const combobox = useComboboxContext()
  const contentProps = mergeProps(() => combobox().contentProps, props)
  return <ark.ul {...contentProps} />
}
