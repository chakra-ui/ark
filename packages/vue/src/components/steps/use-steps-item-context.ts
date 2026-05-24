import type { ItemState } from '@zag-js/steps'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils/create-context.ts'

export interface UseStepsItemContext extends ComputedRef<ItemState> {}

export const [StepsItemProvider, useStepsItemContext] = createContext<UseStepsItemContext>('StepsItemContext')
