import { createContext } from '$lib/utils/create-context'
import type { UsePasswordInputReturn } from './use-password-input.svelte'

export interface UsePasswordInputContext extends UsePasswordInputReturn {}
export const [PasswordInputProvider, usePasswordInputContext] = createContext<UsePasswordInputContext>({
  name: 'PasswordInputContext',
})
