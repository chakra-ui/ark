import { mergeProps } from '@zag-js/react'
import type { ItemGroupLabelProps } from '@zag-js/select'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../../factory'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { useSelectContext } from './use-select-context'

export interface SelectItemGroupLabelProps
  extends Assign<HTMLArkProps<'div'>, ItemGroupLabelProps> {}

export const SelectItemGroupLabel = forwardRef<HTMLDivElement, SelectItemGroupLabelProps>(
  (props, ref) => {
    const [itemGroupLabelProps, localProps] = createSplitProps<ItemGroupLabelProps>()(props, [
      'htmlFor',
    ])
    const select = useSelectContext()
    const mergedProps = mergeProps(select.getItemGroupLabelProps(itemGroupLabelProps), localProps)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

SelectItemGroupLabel.displayName = 'SelectItemGroupLabel'
