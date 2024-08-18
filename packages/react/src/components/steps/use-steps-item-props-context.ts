import type { ItemProps } from '@zag-js/steps'
import { createContext } from '../../utils/create-context'

export interface UseStepsItemPropsContext extends ItemProps {}

export const [StepsItemPropsProvider, useStepsItemPropsContext] =
  createContext<UseStepsItemPropsContext>({
    name: 'StepsItemPropsContext',
    hookName: 'useStepsItemPropsContext',
    providerName: '<StepsItemPropsProvider />',
  })
