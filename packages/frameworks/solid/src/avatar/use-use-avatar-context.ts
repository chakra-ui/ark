import { createContext } from '../create-context'
import { type UseAvatarReturn } from './use-avatar'

export interface UseAvatarContext extends UseAvatarReturn {}

export const [AvatarProvider, useAvatarContext] = createContext<UseAvatarContext>({
  hookName: 'useAvatarContext',
  providerName: '<AvatarProvider />',
})
