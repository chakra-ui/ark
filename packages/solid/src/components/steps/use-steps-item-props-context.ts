import type { ItemProps } from '@zag-js/steps'
import { createContext } from '../../utils/create-context'

export interface UseStepsItemPropsContext extends ItemProps {}

export const [StepsItemPropsProvider, useStepsItemPropsContext] =
  createContext<UseStepsItemPropsContext>({
    hookName: 'useStepsItemPropsContext',
    providerName: '<StepsItemPropsProvider />',
  })
