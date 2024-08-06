import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useStepsContext } from './use-steps-context'
import { useStepsItemPropsContext } from './use-steps-item-props-context'

export interface StepsContentBaseProps extends PolymorphicProps {}
export interface StepsContentProps extends HTMLProps<'div'>, StepsContentBaseProps {}

export const StepsContent = forwardRef<HTMLDivElement, StepsContentProps>((props, ref) => {
  const steps = useStepsContext()
  const itemProps = useStepsItemPropsContext()
  const mergedProps = mergeProps(steps.getContentProps(itemProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

StepsContent.displayName = 'StepsContent'
