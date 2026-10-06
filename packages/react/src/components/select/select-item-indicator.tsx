'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useSelectContext } from './use-select-context.ts'
import { useSelectItemPropsContext } from './use-select-item-props-context.ts'

export interface SelectItemIndicatorBaseProps extends PolymorphicProps {}
export interface SelectItemIndicatorProps extends HTMLProps<'span'>, SelectItemIndicatorBaseProps {}

export const SelectItemIndicator = forwardRef<HTMLSpanElement, SelectItemIndicatorProps>((props, ref) => {
  const select = useSelectContext()
  const itemProps = useSelectItemPropsContext()
  const mergedProps = mergeProps(select.getItemIndicatorProps(itemProps), props)

  return <ark.span {...mergedProps} ref={ref} />
})

SelectItemIndicator.displayName = 'SelectItemIndicator'
