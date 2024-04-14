import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

interface ItemGroupLabelProps {
  for: string
}

export interface ComboboxItemGroupLabelProps
  extends Assign<HTMLArkProps<'div'>, ItemGroupLabelProps> {}

export const ComboboxItemGroupLabel = (props: ComboboxItemGroupLabelProps) => {
  const [labelProps, localProps] = createSplitProps<ItemGroupLabelProps>()(props, ['for'])
  const api = useComboboxContext()
  const mergedProps = mergeProps(
    () => api().getItemGroupLabelProps({ htmlFor: labelProps.for }),
    localProps,
  )

  return <ark.div {...mergedProps} />
}
