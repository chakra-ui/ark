'use client'

import type { ItemProps, ItemState } from '@zag-js/rating-group'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useRatingGroupContext } from './use-rating-group-context.ts'
import { RatingGroupItemProvider } from './use-rating-group-item-context.ts'

export interface RatingGroupItemState extends ItemState {}

export interface RatingGroupItemBaseProps extends ItemProps, PolymorphicProps<RatingGroupItemState> {}
export interface RatingGroupItemProps extends HTMLProps<'span'>, RatingGroupItemBaseProps {}

const splitItemProps = createSplitProps<ItemProps>()

export const RatingGroupItem = forwardRef<HTMLSpanElement, RatingGroupItemProps>((props, ref) => {
  const [itemProps, localProps] = splitItemProps(props, ['index'])
  const ratingGroup = useRatingGroupContext()
  const mergedProps = mergeProps(ratingGroup.getItemProps(itemProps), localProps)
  const itemState = ratingGroup.getItemState(itemProps)

  return (
    <RatingGroupItemProvider value={itemState}>
      <ark.span {...mergedProps} ref={ref} state={ratingGroup.getItemState(itemProps)} />
    </RatingGroupItemProvider>
  )
})

RatingGroupItem.displayName = 'RatingGroupItem'
