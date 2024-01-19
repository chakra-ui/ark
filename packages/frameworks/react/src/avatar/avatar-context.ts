import { createContext } from '../create-context'
import { type UseAvatarReturn } from './use-avatar'

export interface AvatarContext extends UseAvatarReturn {}

export const [AvatarProvider, useAvatarContext] = createContext<AvatarContext>({
  name: 'AvatarContext',
  hookName: 'useAvatarContext',
  providerName: '<AvatarProvider />',
})
