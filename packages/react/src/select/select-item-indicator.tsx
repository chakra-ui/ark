import { mergeProps } from '@zag-js/react'
import type { ItemProps } from '@zag-js/select'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import { useSelectContext } from './select-context'

export type SelectItemIndicatorProps = ComponentPropsWithoutRef<typeof ark.div> & ItemProps

export const SelectItemIndicator = forwardRef<HTMLDivElement, SelectItemIndicatorProps>(
  (props, ref) => {
    const [indicatorProps, localProps] = createSplitProps<ItemProps>()(props, ['item'])
    const api = useSelectContext()
    const mergedProps = mergeProps(api.getItemIndicatorProps(indicatorProps), localProps)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

SelectItemIndicator.displayName = 'SelectItemIndicator'
