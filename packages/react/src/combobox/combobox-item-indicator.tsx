import type { ItemProps } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxItemIndicatorProps = ComponentPropsWithoutRef<typeof ark.div> & ItemProps

export const ComboboxItemIndicator = forwardRef<HTMLDivElement, ComboboxItemIndicatorProps>(
  (props, ref) => {
    const [indicatorProps, localProps] = createSplitProps<ItemProps>()(props, ['item'])
    const api = useComboboxContext()
    const mergedProps = mergeProps(api.getItemIndicatorProps(indicatorProps), localProps)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ComboboxItemIndicator.displayName = 'ComboboxItemIndicator'
