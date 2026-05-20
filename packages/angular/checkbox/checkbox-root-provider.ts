import type * as checkbox from '@zag-js/checkbox'
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
import { ARK_CHECKBOX_CONTEXT } from './use-checkbox-context'
import type { UseCheckboxReturn } from './use-checkbox'

@Directive({
  selector: '[arkCheckboxRootProvider]',
  standalone: true,
  exportAs: 'arkCheckboxRootProvider',
  providers: [{ provide: ARK_CHECKBOX_CONTEXT, useExisting: forwardRef(() => ArkCheckboxRootProvider) }],
})
export class ArkCheckboxRootProvider implements UseCheckboxReturn {
  /** The checkbox primitive returned by useCheckbox(). */
  readonly value: InputSignal<UseCheckboxReturn> = input.required<UseCheckboxReturn>()

  get state(): Signal<checkbox.Service['state']> {
    return this.value().state
  }
  get api(): Signal<checkbox.Api> {
    return this.value().api
  }
  get service(): checkbox.Service {
    return this.value().service
  }
  get send(): checkbox.Service['send'] {
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
