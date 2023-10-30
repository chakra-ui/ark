import type { ItemGroupLabelProps } from '@zag-js/select'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useComboboxContext } from './combobox-context'

export type ComboboxItemGroupLabelProps = Assign<HTMLArkProps<'div'>, ItemGroupLabelProps>

export const ComboboxItemGroupLabel = (props: ComboboxItemGroupLabelProps) => {
  const [labelProps, localProps] = createSplitProps<ItemGroupLabelProps>()(props, ['for'])
  const api = useComboboxContext()
  const mergedProps = mergeProps(() => api().getItemGroupLabelProps(labelProps), localProps)

  return <ark.div {...mergedProps} />
}
