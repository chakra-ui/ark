import { InjectionToken, inject } from '@angular/core'
import type { UsePinInputReturn } from './use-pin-input'

export const ARK_PIN_INPUT_CONTEXT = new InjectionToken<UsePinInputReturn>('ARK_PIN_INPUT_CONTEXT')

/**
 * Internal token used by `ArkPinInputInput` directives to register their
 * `index` with the parent root so the Zag machine knows how many input slots
 * exist. Angular's zoneless useMachine starts the machine in the root
 * directive's constructor, before child input templates have been processed,
 * so `setInputCount` cannot count DOM nodes at entry time.
 *
 * @internal
 */
export interface PinInputCountRegistrar {
  register(index: number): () => void
}

export const ARK_PIN_INPUT_COUNT_REGISTRAR = new InjectionToken<PinInputCountRegistrar>('ARK_PIN_INPUT_COUNT_REGISTRAR')

export function injectArkPinInputContext(): UsePinInputReturn {
  return inject(ARK_PIN_INPUT_CONTEXT)
}
