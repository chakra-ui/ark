import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useStepsContext } from './use-steps-context'

export interface StepsCompletedContentBaseProps extends PolymorphicProps<'div'> {}
export interface StepsCompletedContentProps
  extends HTMLProps<'div'>,
    StepsCompletedContentBaseProps {}

export const StepsCompletedContent = (props: StepsCompletedContentProps) => {
  const steps = useStepsContext()
  const mergedProps = mergeProps(() => steps().getContentProps({ index: steps().count }), props)

  return <ark.div {...mergedProps} />
}
