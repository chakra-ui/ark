import type { ItemGroupLabelProps } from '@zag-js/select'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'

export type SelectItemGroupLabelProps = Assign<HTMLArkProps<'div'>, ItemGroupLabelProps>

export const SelectItemGroupLabel = (props: SelectItemGroupLabelProps) => {
  const [labelParams, localProps] = createSplitProps<ItemGroupLabelProps>()(props, ['htmlFor'])
  const api = useSelectContext()
  const mergedProps = mergeProps(() => api().getItemGroupLabelProps(labelParams), localProps)

  return <ark.div {...mergedProps} />
}
