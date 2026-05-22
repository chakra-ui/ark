'use client'

import { mergeProps } from '@zag-js/react'
import type { ItemProps } from '@zag-js/steps'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useStepsContext } from './use-steps-context'

export interface StepsContentBaseProps extends PolymorphicProps, ItemProps {}
export interface StepsContentProps extends HTMLProps<'div'>, StepsContentBaseProps {}

const splitContentProps = createSplitProps<ItemProps>()

export const StepsContent = ({ ref, ...props }: StepsContentProps) => {
  const [itemProps, localProps] = splitContentProps(props, ['index'])
  const steps = useStepsContext()
  const mergedProps = mergeProps(steps.getContentProps(itemProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
}

StepsContent.displayName = 'StepsContent'
