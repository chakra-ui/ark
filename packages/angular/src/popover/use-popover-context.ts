import { InjectionToken, inject } from '@angular/core'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import type { UsePopoverReturn } from './use-popover'

export const ARK_POPOVER_CONTEXT = new InjectionToken<UsePopoverReturn>('ARK_POPOVER_CONTEXT')

export function injectArkPopoverContext(): UsePopoverReturn {
  return inject(ARK_POPOVER_CONTEXT)
}

export const ARK_POPOVER_CONTEXT_CARRIER = new InjectionToken<ArkContextCarrier<UsePopoverReturn>>(
  'ARK_POPOVER_CONTEXT_CARRIER',
)

export function injectArkPopoverContextCarrier(): ArkContextCarrier<UsePopoverReturn> {
  return inject(ARK_POPOVER_CONTEXT_CARRIER)
}
