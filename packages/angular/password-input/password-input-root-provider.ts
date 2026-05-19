import type * as passwordInput from '@zag-js/password-input'
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
import { ARK_PASSWORD_INPUT_CONTEXT } from './use-password-input-context'
import type { UsePasswordInputReturn } from './use-password-input'

@Directive({
  selector: '[arkPasswordInputRootProvider]',
  standalone: true,
  exportAs: 'arkPasswordInputRootProvider',
  providers: [{ provide: ARK_PASSWORD_INPUT_CONTEXT, useExisting: forwardRef(() => ArkPasswordInputRootProvider) }],
})
export class ArkPasswordInputRootProvider implements UsePasswordInputReturn {
  /** The password input primitive returned by usePasswordInput(). */
  readonly value: InputSignal<UsePasswordInputReturn> = input.required<UsePasswordInputReturn>()

  get state(): Signal<passwordInput.Service['state']> {
    return this.value().state
  }
  get api(): Signal<passwordInput.Api> {
    return this.value().api
  }
  get service(): passwordInput.Service {
    return this.value().service
  }
  get send(): passwordInput.Service['send'] {
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
