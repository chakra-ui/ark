'use client'

import { mergeProps } from '@zag-js/react'
import type { ItemProps } from '@zag-js/steps'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useStepsContext } from './use-steps-context.ts'
import { StepsItemProvider } from './use-steps-item-context.ts'
import { StepsItemPropsProvider } from './use-steps-item-props-context.ts'

export interface StepsItemBaseProps extends ItemProps, PolymorphicProps {}
export interface StepsItemProps extends HTMLProps<'div'>, StepsItemBaseProps {}

const splitItemProps = createSplitProps<ItemProps>()

export const StepsItem = forwardRef<HTMLDivElement, StepsItemProps>((props, ref) => {
  const [itemProps, localProps] = splitItemProps(props, ['index'])
  const steps = useStepsContext()
  const mergedProps = mergeProps(steps.getItemProps(itemProps), localProps)
  const itemState = steps.getItemState(itemProps)

  return (
    <StepsItemPropsProvider value={itemProps}>
      <StepsItemProvider value={itemState}>
        <ark.div {...mergedProps} ref={ref} />
      </StepsItemProvider>
    </StepsItemPropsProvider>
  )
})

StepsItem.displayName = 'StepsItem'
