'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useSelectContext } from './use-select-context.ts'
import { useSelectItemPropsContext } from './use-select-item-props-context.ts'

export interface SelectItemTextBaseProps extends PolymorphicProps {}
export interface SelectItemTextProps extends HTMLProps<'span'>, SelectItemTextBaseProps {}

export const SelectItemText = forwardRef<HTMLDivElement, SelectItemTextProps>((props, ref) => {
  const select = useSelectContext()
  const itemProps = useSelectItemPropsContext()
  const mergedProps = mergeProps(select.getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} ref={ref} />
})

SelectItemText.displayName = 'SelectItemText'
