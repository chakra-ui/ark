import type { ItemState } from '@zag-js/steps'
import { createContext } from '../../utils/create-context'

export interface UseStepsItemContext extends ItemState {}

export const [StepsItemProvider, useStepsItemContext] = createContext<UseStepsItemContext>({
  name: 'StepsItemContext',
  hookName: 'useStepsItemContext',
  providerName: '<StepsItem />',
})
