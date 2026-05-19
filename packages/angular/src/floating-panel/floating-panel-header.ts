import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkFloatingPanelContext } from './use-floating-panel-context'

@Directive({
  selector: '[arkFloatingPanelHeader]',
  standalone: true,
  exportAs: 'arkFloatingPanelHeader',
})
export class ArkFloatingPanelHeader {
  constructor() {
    const context = injectArkFloatingPanelContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getHeaderProps(),
    })
  }
}
