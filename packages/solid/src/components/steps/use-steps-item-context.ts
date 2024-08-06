import type { ItemProps } from '@zag-js/steps'
import { createContext } from '../../utils/create-context'

interface StepsItemContext extends ItemProps {}

export const [StepsItemProvider, useStepsItemContext] = createContext<StepsItemContext>({
  hookName: 'useStepsItemContext',
  providerName: '<StepsItemProvider />',
})
