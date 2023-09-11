import { mergeProps } from '@zag-js/react'
import type { ItemGroupLabelProps } from '@zag-js/select'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'

export type SelectItemGroupLabelProps = Assign<HTMLArkProps<'div'>, ItemGroupLabelProps>

export const SelectItemGroupLabel = forwardRef<HTMLDivElement, SelectItemGroupLabelProps>(
  (props, ref) => {
    const [itemGroupLabelProps, localProps] = createSplitProps<ItemGroupLabelProps>()(props, [
      'htmlFor',
    ])
    const api = useSelectContext()
    const mergedProps = mergeProps(api.getItemGroupLabelProps(itemGroupLabelProps), localProps)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

SelectItemGroupLabel.displayName = 'SelectItemGroupLabel'
