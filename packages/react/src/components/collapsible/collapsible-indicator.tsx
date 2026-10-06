'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useCollapsibleContext } from './use-collapsible-context.ts'

export interface CollapsibleIndicatorBaseProps extends PolymorphicProps {}
export interface CollapsibleIndicatorProps extends HTMLProps<'span'>, CollapsibleIndicatorBaseProps {}

export const CollapsibleIndicator = forwardRef<HTMLSpanElement, CollapsibleIndicatorProps>((props, ref) => {
  const collapsible = useCollapsibleContext()
  const mergedProps = mergeProps(collapsible.getIndicatorProps(), props)

  return <ark.span {...mergedProps} ref={ref} />
})

CollapsibleIndicator.displayName = 'CollapsibleIndicator'
