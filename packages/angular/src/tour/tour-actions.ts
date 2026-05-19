import { DestroyRef, Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { TourStepAction } from './tour.types'
import { injectArkTourContext } from './use-tour-context'

export interface TourActionsTemplate {
  $implicit: TourStepAction[]
  actions: TourStepAction[]
}

@Directive({
  selector: '[arkTourActions]',
  standalone: true,
  exportAs: 'arkTourActions',
})
export class ArkTourActions {
  static ngTemplateContextGuard(_directive: ArkTourActions, context: unknown): context is TourActionsTemplate {
    return true
  }

  private readonly tour = injectArkTourContext()
  private readonly templateRef = inject<TemplateRef<TourActionsTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef, this.createContext())

    effect(() => {
      const context = this.createContext()
      view.context.$implicit = context.$implicit
      view.context.actions = context.actions
      view.detectChanges()
    })

    inject(DestroyRef).onDestroy(() => view.destroy())
  }

  private createContext(): TourActionsTemplate {
    const actions = this.tour.api().step?.actions ?? []
    return { $implicit: actions, actions }
  }
}
