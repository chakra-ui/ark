import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkMarqueeContext } from './use-marquee-context'

@Directive({
  selector: '[arkMarqueeItem]',
  standalone: true,
  exportAs: 'arkMarqueeItem',
})
export class ArkMarqueeItem {
  constructor() {
    const context = injectArkMarqueeContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getItemProps(),
    })
  }
}
