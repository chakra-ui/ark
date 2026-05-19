import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkFloatingPanelContext } from './use-floating-panel-context'

@Directive({
  selector: '[arkFloatingPanelPositioner]',
  standalone: true,
  exportAs: 'arkFloatingPanelPositioner',
})
export class ArkFloatingPanelPositioner {
  constructor() {
    const context = injectArkFloatingPanelContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getPositionerProps(),
    })
  }
}
