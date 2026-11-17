'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useFieldContext } from '../field/use-field-context.ts'
import { useRatingGroupContext } from './use-rating-group-context.ts'

export interface RatingGroupControlBaseProps extends PolymorphicProps {}
export interface RatingGroupControlProps extends HTMLProps<'div'>, RatingGroupControlBaseProps {}

export const RatingGroupControl = forwardRef<HTMLDivElement, RatingGroupControlProps>((props, ref) => {
  const ratingGroup = useRatingGroupContext()
  const mergedProps = mergeProps(ratingGroup.getControlProps(), props)
  const field = useFieldContext()

  return <ark.div aria-describedby={field?.ariaDescribedby} {...mergedProps} ref={ref} />
})

RatingGroupControl.displayName = 'RatingGroupControl'
