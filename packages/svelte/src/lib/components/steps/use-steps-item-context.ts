import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { ItemState } from '@zag-js/steps'

export interface UseStepsItemContext extends Accessor<ItemState> {}

export const [StepsItemProvider, useStepsItemContext] = createContext<UseStepsItemContext>({
  name: 'StepsItemContext',
  hookName: 'useStepsItemContext',
  providerName: '<StepsItemProvider />',
})
