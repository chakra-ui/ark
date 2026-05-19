import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkScrollAreaContext } from './use-scroll-area-context'

@Directive({
  selector: '[arkScrollAreaContent]',
  standalone: true,
  exportAs: 'arkScrollAreaContent',
})
export class ArkScrollAreaContent {
  constructor() {
    const context = injectArkScrollAreaContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getContentProps(),
    })
  }
}
