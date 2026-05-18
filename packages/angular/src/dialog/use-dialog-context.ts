import { InjectionToken, inject } from '@angular/core'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import type { UseDialogReturn } from './use-dialog'

export const ARK_DIALOG_CONTEXT = new InjectionToken<UseDialogReturn>('ARK_DIALOG_CONTEXT')

export function injectArkDialogContext(): UseDialogReturn {
  return inject(ARK_DIALOG_CONTEXT)
}

export const ARK_DIALOG_CONTEXT_CARRIER = new InjectionToken<ArkContextCarrier<UseDialogReturn>>(
  'ARK_DIALOG_CONTEXT_CARRIER',
)

export function injectArkDialogContextCarrier(): ArkContextCarrier<UseDialogReturn> {
  return inject(ARK_DIALOG_CONTEXT_CARRIER)
}
