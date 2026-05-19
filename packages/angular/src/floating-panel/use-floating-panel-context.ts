import { InjectionToken, inject } from '@angular/core'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import type { UseFloatingPanelReturn } from './use-floating-panel'

export const ARK_FLOATING_PANEL_CONTEXT = new InjectionToken<UseFloatingPanelReturn>('ARK_FLOATING_PANEL_CONTEXT')

export function injectArkFloatingPanelContext(): UseFloatingPanelReturn {
  return inject(ARK_FLOATING_PANEL_CONTEXT)
}

export const ARK_FLOATING_PANEL_CONTEXT_CARRIER = new InjectionToken<ArkContextCarrier<UseFloatingPanelReturn>>(
  'ARK_FLOATING_PANEL_CONTEXT_CARRIER',
)

export function injectArkFloatingPanelContextCarrier(): ArkContextCarrier<UseFloatingPanelReturn> {
  return inject(ARK_FLOATING_PANEL_CONTEXT_CARRIER)
}
