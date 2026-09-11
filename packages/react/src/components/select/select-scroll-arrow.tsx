'use client'

import { mergeProps } from '@zag-js/react'
import type { ScrollArrowProps } from '@zag-js/select'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useSelectContext } from './use-select-context.ts'

export interface SelectScrollArrowBaseProps extends ScrollArrowProps, PolymorphicProps {}
export interface SelectScrollArrowProps extends HTMLProps<'div'>, SelectScrollArrowBaseProps {}

const splitScrollArrowProps = createSplitProps<ScrollArrowProps>()

export const SelectScrollArrow = forwardRef<HTMLDivElement, SelectScrollArrowProps>((props, ref) => {
  const [scrollArrowProps, localProps] = splitScrollArrowProps(props, ['placement'])
  const select = useSelectContext()
  const mergedProps = mergeProps(select.getScrollArrowProps(scrollArrowProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

SelectScrollArrow.displayName = 'SelectScrollArrow'
