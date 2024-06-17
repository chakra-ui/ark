import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { useSelectItemPropsContext } from './use-select-item-props-context'

export interface SelectItemIndicatorBaseProps extends PolymorphicProps {}
export interface SelectItemIndicatorProps
  extends HTMLAttributes<HTMLDivElement>,
    SelectItemIndicatorBaseProps {}

export const SelectItemIndicator = forwardRef<HTMLDivElement, SelectItemIndicatorProps>(
  (props, ref) => {
    const select = useSelectContext()
    const itemProps = useSelectItemPropsContext()
    const mergedProps = mergeProps(select.getItemIndicatorProps(itemProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

SelectItemIndicator.displayName = 'SelectItemIndicator'
