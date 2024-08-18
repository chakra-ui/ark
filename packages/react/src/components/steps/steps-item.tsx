import { mergeProps } from '@zag-js/react'
import type { ItemProps } from '@zag-js/steps'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useStepsContext } from './use-steps-context'
import { StepsItemProvider } from './use-steps-item-context'
import { StepsItemPropsProvider } from './use-steps-item-props-context'

export interface StepsItemBaseProps extends ItemProps, PolymorphicProps {}
export interface StepsItemProps extends HTMLProps<'li'>, StepsItemBaseProps {}

export const StepsItem = forwardRef<HTMLLIElement, StepsItemProps>((props, ref) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['index'])
  const steps = useStepsContext()
  const mergedProps = mergeProps(steps.getItemProps(itemProps), localProps)
  const itemState = steps.getItemState(itemProps)

  return (
    <StepsItemPropsProvider value={itemProps}>
      <StepsItemProvider value={itemState}>
        <ark.li {...mergedProps} ref={ref} />
      </StepsItemProvider>
    </StepsItemPropsProvider>
  )
})

StepsItem.displayName = 'StepsItem'
