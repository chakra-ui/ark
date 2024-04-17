import { createContext } from '../../utils'
import type { UseAvatarReturn } from './use-avatar'

export interface UseAvatarContext extends UseAvatarReturn {}

export const [AvatarProvider, useAvatarContext] = createContext<UseAvatarContext>('AvatarContext')
