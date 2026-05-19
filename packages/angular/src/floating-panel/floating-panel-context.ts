import { Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { UseFloatingPanelReturn } from './use-floating-panel'
import { injectArkFloatingPanelContext } from './use-floating-panel-context'

export interface FloatingPanelContextTemplate {
  $implicit: UseFloatingPanelReturn['api']
  api: UseFloatingPanelReturn['api']
}

@Directive({
  selector: '[arkFloatingPanelContext]',
  standalone: true,
  exportAs: 'arkFloatingPanelContext',
})
export class ArkFloatingPanelContext {
  static ngTemplateContextGuard(
    _directive: ArkFloatingPanelContext,
    context: unknown,
  ): context is FloatingPanelContextTemplate {
    return true
  }

  private readonly floatingPanel = injectArkFloatingPanelContext()
  private readonly templateRef = inject<TemplateRef<FloatingPanelContextTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.floatingPanel.api,
      api: this.floatingPanel.api,
    })

    effect(() => {
      this.floatingPanel.api()
      view.detectChanges()
    })
  }
}
