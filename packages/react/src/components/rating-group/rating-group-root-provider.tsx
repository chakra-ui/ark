import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import type { UseRatingGroupReturn } from './use-rating-group'
import { RatingGroupProvider } from './use-rating-group-context'

interface RootProviderProps {
  value: UseRatingGroupReturn
}

export interface RatingGroupRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface RatingGroupRootProviderProps
  extends HTMLAttributes<HTMLDivElement>,
    RatingGroupRootProviderBaseProps {}

export const RatingGroupRootProvider = forwardRef<HTMLDivElement, RatingGroupRootProviderProps>(
  (props, ref) => {
    const [{ value: ratingGroup }, localProps] = createSplitProps<RootProviderProps>()(props, [
      'value',
    ])
    const mergedProps = mergeProps(ratingGroup.getRootProps(), localProps)

    return (
      <RatingGroupProvider value={ratingGroup}>
        <ark.div {...mergedProps} ref={ref} />
      </RatingGroupProvider>
    )
  },
)

RatingGroupRootProvider.displayName = 'RatingGroupRootProvider'
