import { DestroyRef, Directive, ElementRef, Renderer2, inject, input, type InputSignal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { CarouselItemProps } from './carousel.types'
import { injectArkCarouselContext } from './use-carousel-context'

@Directive({
  selector: '[arkCarouselItem]',
  standalone: true,
  exportAs: 'arkCarouselItem',
})
export class ArkCarouselItem {
  /** The zero-based slide index. */
  readonly index: InputSignal<number> = input.required<number>()
  /** The snap alignment of the slide. */
  readonly snapAlign: InputSignal<CarouselItemProps['snapAlign']> = input<CarouselItemProps['snapAlign']>(undefined)

  constructor() {
    const carousel = injectArkCarouselContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () =>
        carousel.api().getItemProps({
          index: this.index(),
          snapAlign: this.snapAlign(),
        }),
    })
  }
}
