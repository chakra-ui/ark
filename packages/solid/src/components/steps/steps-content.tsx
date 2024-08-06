import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useStepsContext } from './use-steps-context'
import { useStepsItemPropsContext } from './use-steps-item-props-context'

export interface StepsContentBaseProps extends PolymorphicProps<'div'> {}
export interface StepsContentProps extends HTMLProps<'div'>, StepsContentBaseProps {}

export const StepsContent = (props: StepsContentProps) => {
  const steps = useStepsContext()
  const itemProps = useStepsItemPropsContext()
  const mergedProps = mergeProps(() => steps().getContentProps(itemProps), props)

  return <ark.div {...mergedProps} />
}
