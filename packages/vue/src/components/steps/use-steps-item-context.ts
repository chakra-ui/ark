import type { ItemProps } from '@zag-js/steps'
import { createContext } from '../../utils'

export interface UseStepsItemContext extends ItemProps {}

export const [StepsItemProvider, useStepsItemContext] =
  createContext<UseStepsItemContext>('StepsItemContext')
