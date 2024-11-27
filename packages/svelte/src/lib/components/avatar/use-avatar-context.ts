import { getContext, setContext } from 'svelte'
import { createContext } from '../../utils'
import type { UseAvatarReturn } from './use-avatar.svelte'

// export interface UseAvatarContext extends UseAvatarReturn {}
// export const [AvatarProvider, useAvatarContext] = createContext<UseAvatarContext>('AvatarContext')

const userKey = Symbol('user')

export function setAvatarContext(user: UseAvatarReturn) {
  setContext(userKey, user)
}

export function getAvatarContext(): UseAvatarReturn {
  return getContext(userKey) as UseAvatarReturn
}
