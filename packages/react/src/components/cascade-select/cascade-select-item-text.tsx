import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'
import { useCascadeSelectItemPropsContext } from './use-cascade-select-item-props-context'

export interface CascadeSelectItemTextBaseProps extends PolymorphicProps {}
export interface CascadeSelectItemTextProps extends HTMLProps<'span'>, CascadeSelectItemTextBaseProps {}

export const CascadeSelectItemText = forwardRef<HTMLSpanElement, CascadeSelectItemTextProps>((props, ref) => {
  const cascadeSelect = useCascadeSelectContext()
  const itemProps = useCascadeSelectItemPropsContext()
  const mergedProps = mergeProps(cascadeSelect.getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} ref={ref} />
})

CascadeSelectItemText.displayName = 'CascadeSelectItemText'
