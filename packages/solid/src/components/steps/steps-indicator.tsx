import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useStepsContext } from './use-steps-context.ts'
import { useStepsItemPropsContext } from './use-steps-item-props-context.ts'

export interface StepsIndicatorBaseProps extends PolymorphicProps<'span'> {}
export interface StepsIndicatorProps extends HTMLProps<'span'>, StepsIndicatorBaseProps {}

export const StepsIndicator = (props: StepsIndicatorProps) => {
  const steps = useStepsContext()
  const itemProps = useStepsItemPropsContext()
  const mergedProps = mergeProps(() => steps().getIndicatorProps(itemProps), props)

  return <ark.span {...mergedProps} />
}
