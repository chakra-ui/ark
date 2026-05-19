import { InjectionToken, inject } from '@angular/core'
import type { UseSignaturePadReturn } from './use-signature-pad'

export const ARK_SIGNATURE_PAD_CONTEXT = new InjectionToken<UseSignaturePadReturn>('ARK_SIGNATURE_PAD_CONTEXT')

export function injectArkSignaturePadContext(): UseSignaturePadReturn {
  return inject(ARK_SIGNATURE_PAD_CONTEXT)
}
