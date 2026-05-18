import { InjectionToken, inject } from '@angular/core'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import type { UseHoverCardReturn } from './use-hover-card'

export const ARK_HOVER_CARD_CONTEXT = new InjectionToken<UseHoverCardReturn>('ARK_HOVER_CARD_CONTEXT')

export function injectArkHoverCardContext(): UseHoverCardReturn {
  return inject(ARK_HOVER_CARD_CONTEXT)
}

export const ARK_HOVER_CARD_CONTEXT_CARRIER = new InjectionToken<ArkContextCarrier<UseHoverCardReturn>>(
  'ARK_HOVER_CARD_CONTEXT_CARRIER',
)

export function injectArkHoverCardContextCarrier(): ArkContextCarrier<UseHoverCardReturn> {
  return inject(ARK_HOVER_CARD_CONTEXT_CARRIER)
}
