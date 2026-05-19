import { Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { UseScrollAreaReturn } from './use-scroll-area'
import { injectArkScrollAreaContext } from './use-scroll-area-context'

export interface ScrollAreaContextTemplate {
  $implicit: UseScrollAreaReturn['api']
  api: UseScrollAreaReturn['api']
}

@Directive({
  selector: '[arkScrollAreaContext]',
  standalone: true,
  exportAs: 'arkScrollAreaContext',
})
export class ArkScrollAreaContext {
  static ngTemplateContextGuard(
    _directive: ArkScrollAreaContext,
    context: unknown,
  ): context is ScrollAreaContextTemplate {
    return true
  }

  private readonly scrollArea = injectArkScrollAreaContext()
  private readonly templateRef = inject<TemplateRef<ScrollAreaContextTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.scrollArea.api,
      api: this.scrollArea.api,
    })

    effect(() => {
      this.scrollArea.api()
      view.detectChanges()
    })
  }
}
