import { DestroyRef, Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { UseCarouselReturn } from './use-carousel'
import { injectArkCarouselContext } from './use-carousel-context'

export interface CarouselContextTemplate {
  $implicit: UseCarouselReturn['api']
  api: UseCarouselReturn['api']
}

@Directive({
  selector: '[arkCarouselContext]',
  standalone: true,
  exportAs: 'arkCarouselContext',
})
export class ArkCarouselContext {
  static ngTemplateContextGuard(_directive: ArkCarouselContext, context: unknown): context is CarouselContextTemplate {
    return true
  }

  private readonly carousel = injectArkCarouselContext()
  private readonly templateRef = inject<TemplateRef<CarouselContextTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.carousel.api,
      api: this.carousel.api,
    })

    effect(() => {
      this.carousel.api()
      view.detectChanges()
    })

    inject(DestroyRef).onDestroy(() => view.destroy())
  }
}
