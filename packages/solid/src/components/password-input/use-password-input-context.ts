import { createContext } from '../../utils/create-context.ts'
import type { UsePasswordInputReturn } from './use-password-input.ts'

export interface UsePasswordInputContext extends UsePasswordInputReturn {}

export const [PasswordInputProvider, usePasswordInputContext] = createContext<UsePasswordInputContext>({
  hookName: 'usePasswordInputContext',
  providerName: '<PasswordInputProvider />',
})
