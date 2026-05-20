import { DestroyRef, Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { UseRatingGroupItemContext } from './use-rating-group-item-context'
import { injectArkRatingGroupItemContext } from './use-rating-group-item-context'

export interface RatingGroupItemContextTemplate {
  $implicit: UseRatingGroupItemContext
  item: UseRatingGroupItemContext
}

@Directive({
  selector: '[arkRatingGroupItemContext]',
  standalone: true,
  exportAs: 'arkRatingGroupItemContext',
})
export class ArkRatingGroupItemContext {
  static ngTemplateContextGuard(
    _directive: ArkRatingGroupItemContext,
    context: unknown,
  ): context is RatingGroupItemContextTemplate {
    return true
  }

  private readonly item = injectArkRatingGroupItemContext()
  private readonly templateRef = inject<TemplateRef<RatingGroupItemContextTemplate>>(TemplateRef)
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
