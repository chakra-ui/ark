import { mergeProps } from '@zag-js/solid'
import type { ItemProps } from '@zag-js/steps'
import { createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useStepsContext } from './use-steps-context.ts'
import { StepsItemProvider } from './use-steps-item-context.ts'
import { StepsItemPropsProvider } from './use-steps-item-props-context.ts'

export interface StepsItemBaseProps extends ItemProps, PolymorphicProps<'div'> {}
export interface StepsItemProps extends HTMLProps<'div'>, StepsItemBaseProps {}

export const StepsItem = (props: StepsItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['index'])
  const steps = useStepsContext()
  const mergedProps = mergeProps(() => steps().getItemProps(itemProps), localProps)
  const itemState = createMemo(() => steps().getItemState(itemProps))

  return (
    <StepsItemPropsProvider value={itemProps}>
      <StepsItemProvider value={itemState}>
        <ark.div {...mergedProps} />
      </StepsItemProvider>
    </StepsItemPropsProvider>
  )
}
