import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { ItemProps } from '@zag-js/steps'

export interface UseStepsItemPropsContext extends Accessor<ItemProps> {}

export const [StepsItemPropsProvider, useStepsItemPropsContext] = createContext<UseStepsItemPropsContext>({
  name: 'StepsItemPropsContext',
  hookName: 'useStepsItemPropsContext',
  providerName: '<StepsItemPropsProvider />',
})
