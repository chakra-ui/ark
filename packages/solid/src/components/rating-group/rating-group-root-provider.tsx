import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseRatingGroupReturn } from './use-rating-group'
import { RatingGroupProvider } from './use-rating-group-context'

interface RootProviderProps {
  value: UseRatingGroupReturn
}

export interface RatingGroupRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface RatingGroupRootProviderProps
  extends HTMLProps<'div'>,
    RootProviderProps,
    RatingGroupRootProviderBaseProps {}

export const RatingGroupRootProvider = (props: RatingGroupRootProviderProps) => {
  const [{ value: ratingGroup }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => ratingGroup().getRootProps(), localProps)

  return (
    <RatingGroupProvider value={ratingGroup}>
      <ark.div {...mergedProps} />
    </RatingGroupProvider>
  )
}
