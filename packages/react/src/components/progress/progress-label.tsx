'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressLabelBaseProps extends PolymorphicProps {}
export interface ProgressLabelProps extends HTMLProps<'span'>, ProgressLabelBaseProps {}

export const ProgressLabel = forwardRef<HTMLSpanElement, ProgressLabelProps>((props, ref) => {
  const progress = useProgressContext()
  const mergedProps = mergeProps(progress.getLabelProps(), props)

  return <ark.span {...mergedProps} ref={ref} />
})

ProgressLabel.displayName = 'ProgressLabel'
