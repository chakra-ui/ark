import type { Accessor } from '$lib/types'
import type { PropTypes } from '@zag-js/svelte'
import type * as tour from '@zag-js/tour'
import { createContext } from '../../utils/create-context'

export interface UseTourContext extends Accessor<tour.Api<PropTypes>> {}

export const [TourProvider, useTourContext] = createContext<UseTourContext>({
  name: 'TourContext',
  hookName: 'useTourContext',
  providerName: '<TourProvider />',
})
