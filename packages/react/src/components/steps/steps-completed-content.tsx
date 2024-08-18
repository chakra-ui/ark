import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useStepsContext } from './use-steps-context'

export interface StepsCompletedContentBaseProps extends PolymorphicProps {}
export interface StepsCompletedContentProps
  extends HTMLProps<'div'>,
    StepsCompletedContentBaseProps {}

export const StepsCompletedContent = forwardRef<HTMLDivElement, StepsCompletedContentProps>(
  (props, ref) => {
    const steps = useStepsContext()
    const mergedProps = mergeProps(steps.getContentProps({ index: steps.count }), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

StepsCompletedContent.displayName = 'StepsCompletedContent'
