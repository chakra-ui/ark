import type { OptionGroupProps } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useComboboxContext } from './combobox-context'

export type ComboboxOptionGroupProps = Assign<HTMLArkProps<'div'>, OptionGroupProps>

export const ComboboxOptionGroup = (props: ComboboxOptionGroupProps) => {
  const [optionGroupProps, localProps] = createSplitProps<OptionGroupProps>()(props, ['id'])
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(() => combobox().getOptionGroupProps(optionGroupProps), localProps)

  return <ark.div {...mergedProps} />
}
