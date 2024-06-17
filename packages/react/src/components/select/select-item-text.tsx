import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { useSelectItemPropsContext } from './use-select-item-props-context'

export interface SelectItemTextBaseProps extends PolymorphicProps {}
export interface SelectItemTextProps
  extends HTMLAttributes<HTMLSpanElement>,
    SelectItemTextBaseProps {}

export const SelectItemText = forwardRef<HTMLDivElement, SelectItemTextProps>((props, ref) => {
  const select = useSelectContext()
  const itemProps = useSelectItemPropsContext()
  const mergedProps = mergeProps(select.getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} ref={ref} />
})

SelectItemText.displayName = 'SelectItemText'
