'use client'

import { createContext } from '../../utils/create-context'
import type { UseDateInputReturn } from './use-date-input'

export interface UseDateInputContext extends UseDateInputReturn {}

export const [DateInputProvider, useDateInputContext] = createContext<UseDateInputContext>({
  name: 'DateInputContext',
  hookName: 'useDateInputContext',
  providerName: '<DateInput.Root />',
})
