import { InjectionToken, inject } from '@angular/core'
import type { UsePasswordInputReturn } from './use-password-input'

export const ARK_PASSWORD_INPUT_CONTEXT = new InjectionToken<UsePasswordInputReturn>('ARK_PASSWORD_INPUT_CONTEXT')

export function injectArkPasswordInputContext(): UsePasswordInputReturn {
  return inject(ARK_PASSWORD_INPUT_CONTEXT)
}

export interface PasswordInputValueWriter {
  setValue: (value: string) => void
}

export const ARK_PASSWORD_INPUT_VALUE_WRITER = new InjectionToken<PasswordInputValueWriter>(
  'ARK_PASSWORD_INPUT_VALUE_WRITER',
)
