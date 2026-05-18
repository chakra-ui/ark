import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkCollapsibleContext } from './use-collapsible-context'

@Directive({
  selector: '[arkCollapsibleContent]',
  standalone: true,
  exportAs: 'arkCollapsibleContent',
})
export class ArkCollapsibleContent {
  constructor() {
    const context = injectArkCollapsibleContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getContentProps(),
    })
  }
}
