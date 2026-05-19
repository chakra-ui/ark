import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  computed,
  forwardRef,
  inject,
  input,
  type InputSignal,
  type Signal,
} from '@angular/core'
import type * as carousel from '@zag-js/carousel'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_CAROUSEL_CONTEXT } from './use-carousel-context'
import type { UseCarouselReturn } from './use-carousel'

@Directive({
  selector: '[arkCarouselRootProvider]',
  standalone: true,
  exportAs: 'arkCarouselRootProvider',
  providers: [{ provide: ARK_CAROUSEL_CONTEXT, useExisting: forwardRef(() => ArkCarouselRootProvider) }],
})
export class ArkCarouselRootProvider implements UseCarouselReturn {
  /** The carousel machine returned by useCarousel(). */
  readonly value: InputSignal<UseCarouselReturn> = input.required<UseCarouselReturn>()
  readonly state: Signal<carousel.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<carousel.Api> = computed(() => this.value().api())
  readonly send: carousel.Service['send'] = (event) => this.value().send(event)

  get service(): carousel.Service {
    return this.value().service
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
