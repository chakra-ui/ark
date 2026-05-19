import { InjectionToken, inject } from '@angular/core'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import type { UseColorPickerReturn } from './use-color-picker'

export const ARK_COLOR_PICKER_CONTEXT = new InjectionToken<UseColorPickerReturn>('ARK_COLOR_PICKER_CONTEXT')

export function injectArkColorPickerContext(): UseColorPickerReturn {
  return inject(ARK_COLOR_PICKER_CONTEXT)
}

export const ARK_COLOR_PICKER_CONTEXT_CARRIER = new InjectionToken<ArkContextCarrier<UseColorPickerReturn>>(
  'ARK_COLOR_PICKER_CONTEXT_CARRIER',
)

export function injectArkColorPickerContextCarrier(): ArkContextCarrier<UseColorPickerReturn> {
  return inject(ARK_COLOR_PICKER_CONTEXT_CARRIER)
}
