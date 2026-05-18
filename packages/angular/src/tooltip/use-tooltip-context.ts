import { InjectionToken, inject } from '@angular/core'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import type { UseTooltipReturn } from './use-tooltip'

export const ARK_TOOLTIP_CONTEXT = new InjectionToken<UseTooltipReturn>('ARK_TOOLTIP_CONTEXT')

export function injectArkTooltipContext(): UseTooltipReturn {
  return inject(ARK_TOOLTIP_CONTEXT)
}

export const ARK_TOOLTIP_CONTEXT_CARRIER = new InjectionToken<ArkContextCarrier<UseTooltipReturn>>(
  'ARK_TOOLTIP_CONTEXT_CARRIER',
)

export function injectArkTooltipContextCarrier(): ArkContextCarrier<UseTooltipReturn> {
  return inject(ARK_TOOLTIP_CONTEXT_CARRIER)
}
