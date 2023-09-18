import { createContext } from '../context'
import { type UseAvatarReturn } from './use-avatar'

export const [AvatarProvider, useAvatarContext] = createContext<UseAvatarReturn>('AvatarContext')
