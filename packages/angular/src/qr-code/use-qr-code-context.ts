import { InjectionToken, inject } from '@angular/core'
import type { UseQrCodeReturn } from './use-qr-code'

export const ARK_QR_CODE_CONTEXT = new InjectionToken<UseQrCodeReturn>('ARK_QR_CODE_CONTEXT')

export function injectArkQrCodeContext(): UseQrCodeReturn {
  return inject(ARK_QR_CODE_CONTEXT)
}
