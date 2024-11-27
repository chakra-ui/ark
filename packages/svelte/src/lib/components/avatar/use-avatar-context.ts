import { createContext } from '$lib/utils/create-context'
import type { UseAvatarReturn } from './use-avatar.svelte'

export interface UseAvatarContext extends UseAvatarReturn {}
export const [AvatarProvider, useAvatarContext] = createContext<UseAvatarContext>({
  key: 'AvatarContext',
})
