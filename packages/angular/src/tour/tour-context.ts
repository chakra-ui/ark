import { Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { UseTourReturn } from './use-tour'
import { injectArkTourContext } from './use-tour-context'

export interface TourContextTemplate {
  $implicit: UseTourReturn['api']
  api: UseTourReturn['api']
}

@Directive({
  selector: '[arkTourContext]',
  standalone: true,
  exportAs: 'arkTourContext',
})
export class ArkTourContext {
  static ngTemplateContextGuard(_directive: ArkTourContext, context: unknown): context is TourContextTemplate {
    return true
  }

  private readonly tour = injectArkTourContext()
  private readonly templateRef = inject<TemplateRef<TourContextTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.tour.api,
      api: this.tour.api,
    })

    effect(() => {
      this.tour.api()
      view.detectChanges()
    })
  }
}
