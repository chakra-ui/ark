import { createContext } from '../../utils/create-context'
import type { UsePasswordInputReturn } from './use-password-input'

export interface UsePasswordInputContext extends UsePasswordInputReturn {}

export const [PasswordInputProvider, usePasswordInputContext] = createContext<UsePasswordInputContext>('PasswordInput')
