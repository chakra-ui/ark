import type * as slider from '@zag-js/slider'
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
import { ARK_SLIDER_CONTEXT } from './use-slider-context'
import type { UseSliderReturn } from './use-slider'

@Directive({
  selector: '[arkSliderRootProvider]',
  standalone: true,
  exportAs: 'arkSliderRootProvider',
  providers: [{ provide: ARK_SLIDER_CONTEXT, useExisting: forwardRef(() => ArkSliderRootProvider) }],
})
export class ArkSliderRootProvider implements UseSliderReturn {
  /** The slider primitive returned by useSlider(). */
  readonly value: InputSignal<UseSliderReturn> = input.required<UseSliderReturn>()

  get state(): Signal<slider.Service['state']> {
    return this.value().state
  }
  get api(): Signal<slider.Api> {
    return this.value().api
  }
  get service(): slider.Service {
    return this.value().service
  }
  get send(): slider.Service['send'] {
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
