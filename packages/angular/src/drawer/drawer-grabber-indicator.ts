import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkDrawerContext } from './use-drawer-context'

@Directive({
  selector: '[arkDrawerGrabberIndicator]',
  standalone: true,
  exportAs: 'arkDrawerGrabberIndicator',
})
export class ArkDrawerGrabberIndicator {
  constructor() {
    const context = injectArkDrawerContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getGrabberIndicatorProps(),
    })
  }
}
