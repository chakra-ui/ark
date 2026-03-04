import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'
import { useCascadeSelectItemPropsContext } from './use-cascade-select-item-props-context'

export interface CascadeSelectItemIndicatorBaseProps extends PolymorphicProps {}
export interface CascadeSelectItemIndicatorProps extends HTMLProps<'div'>, CascadeSelectItemIndicatorBaseProps {}

export const CascadeSelectItemIndicator = forwardRef<HTMLDivElement, CascadeSelectItemIndicatorProps>((props, ref) => {
  const cascadeSelect = useCascadeSelectContext()
  const itemProps = useCascadeSelectItemPropsContext()
  const mergedProps = mergeProps(cascadeSelect.getItemIndicatorProps(itemProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

CascadeSelectItemIndicator.displayName = 'CascadeSelectItemIndicator'
