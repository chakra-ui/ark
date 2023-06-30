import { createContext } from '../create-context'
import { type UseAvatarReturn } from './use-avatar'

export type AvatarContext = UseAvatarReturn

export const [AvatarProvider, useAvatarContext] = createContext<AvatarContext>({
  hookName: 'useAvatarContext',
  providerName: '<AvatarProvider />',
})
