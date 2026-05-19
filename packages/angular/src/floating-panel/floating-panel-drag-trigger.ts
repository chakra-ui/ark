import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkFloatingPanelContext } from './use-floating-panel-context'

@Directive({
  selector: '[arkFloatingPanelDragTrigger]',
  standalone: true,
  exportAs: 'arkFloatingPanelDragTrigger',
})
export class ArkFloatingPanelDragTrigger {
  constructor() {
    const context = injectArkFloatingPanelContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getDragTriggerProps(),
    })
  }
}
