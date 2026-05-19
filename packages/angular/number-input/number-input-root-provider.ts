import type * as numberInput from '@zag-js/number-input'
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
import { ARK_NUMBER_INPUT_CONTEXT } from './use-number-input-context'
import type { UseNumberInputReturn } from './use-number-input'

@Directive({
  selector: '[arkNumberInputRootProvider]',
  standalone: true,
  exportAs: 'arkNumberInputRootProvider',
  providers: [{ provide: ARK_NUMBER_INPUT_CONTEXT, useExisting: forwardRef(() => ArkNumberInputRootProvider) }],
})
export class ArkNumberInputRootProvider implements UseNumberInputReturn {
  /** The number input primitive returned by useNumberInput(). */
  readonly value: InputSignal<UseNumberInputReturn> = input.required<UseNumberInputReturn>()

  get state(): Signal<numberInput.Service['state']> {
    return this.value().state
  }
  get api(): Signal<numberInput.Api> {
    return this.value().api
  }
  get service(): numberInput.Service {
    return this.value().service
  }
  get send(): numberInput.Service['send'] {
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
