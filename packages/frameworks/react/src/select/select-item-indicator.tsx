import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'
import { useSelectItemContext } from './select-item-context'

export interface SelectItemIndicatorProps extends HTMLArkProps<'div'> {}

export const SelectItemIndicator = forwardRef<HTMLDivElement, SelectItemIndicatorProps>(
  (props, ref) => {
    const api = useSelectContext()
    const itemProps = useSelectItemContext()
    const mergedProps = mergeProps(api.getItemIndicatorProps(itemProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

SelectItemIndicator.displayName = 'SelectItemIndicator'
