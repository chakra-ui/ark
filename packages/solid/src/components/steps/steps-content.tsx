import { mergeProps } from '@zag-js/solid'
import type { ItemProps } from '@zag-js/steps'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useStepsContext } from './use-steps-context'

export interface StepsContentBaseProps extends PolymorphicProps<'div'>, ItemProps {}
export interface StepsContentProps extends HTMLProps<'div'>, StepsContentBaseProps {}

export const StepsContent = (props: StepsContentProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['index'])
  const steps = useStepsContext()
  const mergedProps = mergeProps(() => steps().getContentProps(itemProps), localProps)

  return <ark.div {...mergedProps} />
}
