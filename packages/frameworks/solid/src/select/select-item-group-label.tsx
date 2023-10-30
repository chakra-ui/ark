import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'

interface ItemGroupLabelProps {
  for: string
}

export interface SelectItemGroupLabelProps
  extends Assign<HTMLArkProps<'div'>, ItemGroupLabelProps> {}

export const SelectItemGroupLabel = (props: SelectItemGroupLabelProps) => {
  const [labelProps, localProps] = createSplitProps<ItemGroupLabelProps>()(props, ['for'])
  const api = useSelectContext()
  const mergedProps = mergeProps(
    () => api().getItemGroupLabelProps({ htmlFor: labelProps.for }),
    localProps,
  )

  return <ark.div {...mergedProps} />
}
