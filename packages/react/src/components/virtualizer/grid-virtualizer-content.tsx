'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useGridVirtualizerContext } from './use-grid-virtualizer-context.ts'

export interface GridVirtualizerContentBaseProps extends PolymorphicProps {}
export interface GridVirtualizerContentProps extends HTMLProps<'div'>, GridVirtualizerContentBaseProps {}

export const GridVirtualizerContent = forwardRef<HTMLDivElement, GridVirtualizerContentProps>((props, ref) => {
  const virtualizer = useGridVirtualizerContext()
  const mergedProps = mergeProps({ style: virtualizer.getContentStyle() }, props)

  return <ark.div {...mergedProps} ref={ref} />
})

GridVirtualizerContent.displayName = 'GridVirtualizerContent'
