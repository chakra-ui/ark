import type * as angleSlider from '@zag-js/angle-slider'
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
import { ARK_ANGLE_SLIDER_CONTEXT } from './use-angle-slider-context'
import type { UseAngleSliderReturn } from './use-angle-slider'

@Directive({
  selector: '[arkAngleSliderRootProvider]',
  standalone: true,
  exportAs: 'arkAngleSliderRootProvider',
  providers: [{ provide: ARK_ANGLE_SLIDER_CONTEXT, useExisting: forwardRef(() => ArkAngleSliderRootProvider) }],
})
export class ArkAngleSliderRootProvider implements UseAngleSliderReturn {
  /** The angle slider primitive returned by useAngleSlider(). */
  readonly value: InputSignal<UseAngleSliderReturn> = input.required<UseAngleSliderReturn>()

  get state(): Signal<angleSlider.Service['state']> {
    return this.value().state
  }
  get api(): Signal<angleSlider.Api> {
    return this.value().api
  }
  get service(): angleSlider.Service {
    return this.value().service
  }
  get send(): angleSlider.Service['send'] {
    return this.value().send
  }

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }
}
