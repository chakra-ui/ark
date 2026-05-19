import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkCarouselContext } from './use-carousel-context'

@Directive({
  selector: '[arkCarouselItemGroup]',
  standalone: true,
  exportAs: 'arkCarouselItemGroup',
})
export class ArkCarouselItemGroup {
  constructor() {
    const carousel = injectArkCarouselContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => carousel.api().getItemGroupProps(),
    })
  }
}
