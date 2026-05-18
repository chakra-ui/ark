import { InjectionToken, inject } from '@angular/core'
import type { UseAvatarReturn } from './use-avatar'

export const ARK_AVATAR_CONTEXT = new InjectionToken<UseAvatarReturn>('ARK_AVATAR_CONTEXT')

export function injectArkAvatarContext(): UseAvatarReturn {
  return inject(ARK_AVATAR_CONTEXT)
}
