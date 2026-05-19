import { InjectionToken, inject } from '@angular/core'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import type { UseTourReturn } from './use-tour'

export const ARK_TOUR_CONTEXT = new InjectionToken<UseTourReturn>('ARK_TOUR_CONTEXT')

export function injectArkTourContext(): UseTourReturn {
  return inject(ARK_TOUR_CONTEXT)
}

export const ARK_TOUR_CONTEXT_CARRIER = new InjectionToken<ArkContextCarrier<UseTourReturn>>('ARK_TOUR_CONTEXT_CARRIER')

export function injectArkTourContextCarrier(): ArkContextCarrier<UseTourReturn> {
  return inject(ARK_TOUR_CONTEXT_CARRIER)
}
