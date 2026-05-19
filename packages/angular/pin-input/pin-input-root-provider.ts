import type * as pinInput from '@zag-js/pin-input'
import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  forwardRef,
  inject,
  input,
  type InputSignal,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_PIN_INPUT_CONTEXT } from './use-pin-input-context'
import type { UsePinInputReturn } from './use-pin-input'

@Directive({
  selector: '[arkPinInputRootProvider]',
  standalone: true,
  exportAs: 'arkPinInputRootProvider',
  providers: [{ provide: ARK_PIN_INPUT_CONTEXT, useExisting: forwardRef(() => ArkPinInputRootProvider) }],
})
export class ArkPinInputRootProvider implements UsePinInputReturn {
  /** The pin input primitive returned by usePinInput(). */
  readonly value: InputSignal<UsePinInputReturn> = input.required<UsePinInputReturn>()

  get state(): Signal<pinInput.Service['state']> {
    return this.value().state
  }
  get api(): Signal<pinInput.Api> {
    return this.value().api
  }
  get service(): pinInput.Service {
    return this.value().service
  }
  get send(): pinInput.Service['send'] {
    return this.value().send
  }

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.value().api().getRootProps(),
    })
  }
}
