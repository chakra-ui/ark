import { createContext } from '../../utils/create-context.ts'
import type { UseAvatarReturn } from './use-avatar.ts'

export interface UseAvatarContext extends UseAvatarReturn {}

export const [AvatarProvider, useAvatarContext] = createContext<UseAvatarContext>({
  hookName: 'useAvatarContext',
  providerName: '<AvatarProvider />',
})
