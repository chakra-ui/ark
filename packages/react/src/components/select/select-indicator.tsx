'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useSelectContext } from './use-select-context.ts'

export interface SelectIndicatorBaseProps extends PolymorphicProps {}
export interface SelectIndicatorProps extends HTMLProps<'span'>, SelectIndicatorBaseProps {}

export const SelectIndicator = forwardRef<HTMLSpanElement, SelectIndicatorProps>((props, ref) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(select.getIndicatorProps(), props)

  return <ark.span {...mergedProps} ref={ref} />
})

SelectIndicator.displayName = 'SelectIndicator'
