'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useStepsContext } from './use-steps-context'

export interface StepsCompletedContentBaseProps extends PolymorphicProps {}
export interface StepsCompletedContentProps extends HTMLProps<'div'>, StepsCompletedContentBaseProps {}

export const StepsCompletedContent = ({ ref, ...props }: StepsCompletedContentProps) => {
  const steps = useStepsContext()
  const mergedProps = mergeProps(steps.getContentProps({ index: steps.count }), props)

  return <ark.div {...mergedProps} ref={ref} />
}

StepsCompletedContent.displayName = 'StepsCompletedContent'
