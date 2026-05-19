import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkScrollAreaContext } from './use-scroll-area-context'
import { injectArkScrollAreaScrollbarContext } from './use-scroll-area-scrollbar-context'

@Directive({
  selector: '[arkScrollAreaThumb]',
  standalone: true,
  exportAs: 'arkScrollAreaThumb',
})
export class ArkScrollAreaThumb {
  constructor() {
    const context = injectArkScrollAreaContext()
    const scrollbar = injectArkScrollAreaScrollbarContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getThumbProps({ orientation: scrollbar.orientation() }),
    })
  }
}
