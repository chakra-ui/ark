import { InjectionToken, inject } from '@angular/core'
import type { UseClipboardReturn } from './use-clipboard'

export const ARK_CLIPBOARD_CONTEXT = new InjectionToken<UseClipboardReturn>('ARK_CLIPBOARD_CONTEXT')

export function injectArkClipboardContext(): UseClipboardReturn {
  return inject(ARK_CLIPBOARD_CONTEXT)
}
