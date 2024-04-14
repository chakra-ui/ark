import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../../factory'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { useSelectContext } from './use-select-context'

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
