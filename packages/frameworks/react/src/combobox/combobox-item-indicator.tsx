import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'
import { useComboboxItemContext } from './combobox-item-context'

export interface ComboboxItemIndicatorProps extends HTMLArkProps<'div'> {}

export const ComboboxItemIndicator = forwardRef<HTMLDivElement, ComboboxItemIndicatorProps>(
  (props, ref) => {
    const api = useComboboxContext()
    const item = useComboboxItemContext()
    const mergedProps = mergeProps(api.getItemIndicatorProps(item), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ComboboxItemIndicator.displayName = 'ComboboxItemIndicator'
