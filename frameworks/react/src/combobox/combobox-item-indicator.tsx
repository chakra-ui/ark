import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './use-combobox-context'
import { useComboboxItemPropsContext } from './use-combobox-item-context'

export interface ComboboxItemIndicatorProps extends HTMLArkProps<'div'> {}

export const ComboboxItemIndicator = forwardRef<HTMLDivElement, ComboboxItemIndicatorProps>(
  (props, ref) => {
    const context = useComboboxContext()
    const itemProps = useComboboxItemPropsContext()
    const mergedProps = mergeProps(context.getItemIndicatorProps(itemProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ComboboxItemIndicator.displayName = 'ComboboxItemIndicator'
