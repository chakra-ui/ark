import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useComboboxContext } from './combobox-context'
import { useComboboxItemContext } from './combobox-item-context'

export type ComboboxItemIndicatorProps = ComponentPropsWithoutRef<typeof ark.div>

export const ComboboxItemIndicator = forwardRef<HTMLDivElement, ComboboxItemIndicatorProps>(
  (props, ref) => {
    const api = useComboboxContext()
    const item = useComboboxItemContext()
    const mergedProps = mergeProps(api.getItemIndicatorProps(item), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ComboboxItemIndicator.displayName = 'ComboboxItemIndicator'
