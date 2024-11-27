import { createContext } from '../../utils'
import type { UseAvatarReturn } from './use-avatar.svelte'

export interface UseAvatarContext extends UseAvatarReturn {}
export const [AvatarProvider, useAvatarContext] = createContext<UseAvatarContext>('AvatarContext')
