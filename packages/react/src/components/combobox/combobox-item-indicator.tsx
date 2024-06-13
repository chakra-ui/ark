import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'
import { useComboboxItemPropsContext } from './use-combobox-item-props-context'

export type ComboboxItemIndicatorBaseProps = {}
export interface ComboboxItemIndicatorProps
  extends HTMLArkProps<'div'>,
    ComboboxItemIndicatorBaseProps {}

export const ComboboxItemIndicator = forwardRef<HTMLDivElement, ComboboxItemIndicatorProps>(
  (props, ref) => {
    const combobox = useComboboxContext()
    const itemProps = useComboboxItemPropsContext()
    const mergedProps = mergeProps(combobox.getItemIndicatorProps(itemProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ComboboxItemIndicator.displayName = 'ComboboxItemIndicator'
