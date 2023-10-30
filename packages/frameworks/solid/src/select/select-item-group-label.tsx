import type { ItemGroupLabelProps } from '@zag-js/select'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'

export type SelectItemGroupLabelProps = Assign<HTMLArkProps<'div'>, ItemGroupLabelProps>

export const SelectItemGroupLabel = (props: SelectItemGroupLabelProps) => {
  const [labelProps, localProps] = createSplitProps<ItemGroupLabelProps>()(props, ['for'])
  const api = useSelectContext()
  const mergedProps = mergeProps(() => api().getItemGroupLabelProps(labelProps), localProps)

  return <ark.div {...mergedProps} />
}
