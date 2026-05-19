import { InjectionToken, inject } from '@angular/core'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import type { ArkToastRoot } from './toast-root'

export const ARK_TOAST_CONTEXT = new InjectionToken<ArkToastRoot>('ARK_TOAST_CONTEXT')

export function injectArkToastContext(): ArkToastRoot {
  return inject(ARK_TOAST_CONTEXT)
}

export const ARK_TOAST_CONTEXT_CARRIER = new InjectionToken<ArkContextCarrier<ArkToastRoot>>(
  'ARK_TOAST_CONTEXT_CARRIER',
)

export function injectArkToastContextCarrier(): ArkContextCarrier<ArkToastRoot> {
  return inject(ARK_TOAST_CONTEXT_CARRIER)
}
