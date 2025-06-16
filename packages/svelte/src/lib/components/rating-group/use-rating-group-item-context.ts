import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { ItemState } from '@zag-js/rating-group'

export interface UseRatingGroupItemContext extends Accessor<ItemState> {}

export const [RatingGroupItemProvider, useRatingGroupItemContext] = createContext<UseRatingGroupItemContext>({
  name: 'RatingGroupItemContext',
  hookName: 'useRatingGroupItemContext',
  providerName: '<RatingGroupItemProvider />',
})
