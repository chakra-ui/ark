'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useRatingGroupContext } from './use-rating-group-context.ts'
import type { ControlState } from '@zag-js/rating-group'

export interface RatingGroupControlState extends ControlState {}

export interface RatingGroupControlBaseProps extends PolymorphicProps<RatingGroupControlState> {}
export interface RatingGroupControlProps extends HTMLProps<'div'>, RatingGroupControlBaseProps {}

export const RatingGroupControl = forwardRef<HTMLDivElement, RatingGroupControlProps>((props, ref) => {
  const ratingGroup = useRatingGroupContext()
  const mergedProps = mergeProps(ratingGroup.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} state={ratingGroup.getControlState()} />
})

RatingGroupControl.displayName = 'RatingGroupControl'
