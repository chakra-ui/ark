import type { ItemState } from '@zag-js/steps'
import type { Accessor } from 'solid-js'
import { createContext } from '../../utils/create-context'

export interface UseStepsItemContext extends Accessor<ItemState> {}

export const [StepsItemProvider, useStepsItemContext] = createContext<UseStepsItemContext>({
  hookName: 'useStepsItemContext',
  providerName: '<StepsItem />',
})
