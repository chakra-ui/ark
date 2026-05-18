import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkDrawerStackContext } from './use-drawer-stack-context'

@Directive({
  selector: '[arkDrawerIndentBackground]',
  standalone: true,
  exportAs: 'arkDrawerIndentBackground',
})
export class ArkDrawerIndentBackground {
  constructor() {
    const context = injectArkDrawerStackContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getIndentBackgroundProps(),
    })
  }
}
