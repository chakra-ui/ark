import { DestroyRef, Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { UseRatingGroupReturn } from './use-rating-group'
import { injectArkRatingGroupContext } from './use-rating-group-context'

export interface RatingGroupContextTemplate {
  $implicit: UseRatingGroupReturn['api']
  api: UseRatingGroupReturn['api']
}

@Directive({
  selector: '[arkRatingGroupContext]',
  standalone: true,
  exportAs: 'arkRatingGroupContext',
})
export class ArkRatingGroupContext {
  static ngTemplateContextGuard(
    _directive: ArkRatingGroupContext,
    context: unknown,
  ): context is RatingGroupContextTemplate {
    return true
  }

  private readonly ratingGroup = injectArkRatingGroupContext()
  private readonly templateRef = inject<TemplateRef<RatingGroupContextTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.ratingGroup.api,
      api: this.ratingGroup.api,
    })

    effect(() => {
      this.ratingGroup.api()
      view.detectChanges()
    })

    inject(DestroyRef).onDestroy(() => view.destroy())
  }
}
