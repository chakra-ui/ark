import { DestroyRef, Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { UseStepsItemContext } from './use-steps-item-context'
import { injectArkStepsItemContext } from './use-steps-item-context'

export interface StepsItemContextTemplate {
  $implicit: UseStepsItemContext
  item: UseStepsItemContext
}

@Directive({
  selector: '[arkStepsItemContext]',
  standalone: true,
  exportAs: 'arkStepsItemContext',
})
export class ArkStepsItemContext {
  static ngTemplateContextGuard(
    _directive: ArkStepsItemContext,
    context: unknown,
  ): context is StepsItemContextTemplate {
    return true
  }

  private readonly item = injectArkStepsItemContext()
  private readonly templateRef = inject<TemplateRef<StepsItemContextTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.item,
      item: this.item,
    })

    effect(() => {
      this.item()
      view.detectChanges()
    })

    inject(DestroyRef).onDestroy(() => view.destroy())
  }
}
