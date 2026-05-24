'use client'

import { createContext } from '../../utils/create-context.ts'
import type { UseCheckboxGroupReturn } from './use-checkbox-group.ts'

export interface UseCheckboxGroupContext extends UseCheckboxGroupReturn {}

export const [CheckboxGroupContextProvider, useCheckboxGroupContext] = createContext<
  UseCheckboxGroupContext | undefined
>({
  name: 'CheckboxGroupContext',
  hookName: 'useCheckboxGroupContext',
  providerName: '<CheckboxGroupProvider />',
  strict: false,
})
