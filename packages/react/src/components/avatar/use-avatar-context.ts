import { createContext } from '../../utils/create-context'
import type { UseAvatarReturn } from './use-avatar'

export interface UseAvatarContext extends UseAvatarReturn {}

export const [AvatarProvider, useAvatarContext] = createContext<UseAvatarContext>({
  name: 'AvatarContext',
  hookName: 'useAvatarContext',
  providerName: '<AvatarProvider />',
})
