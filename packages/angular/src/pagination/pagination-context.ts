import { Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { UsePaginationReturn } from './use-pagination'
import { injectArkPaginationContext } from './use-pagination-context'

export interface PaginationContextTemplate {
  $implicit: UsePaginationReturn['api']
  api: UsePaginationReturn['api']
}

@Directive({
  selector: '[arkPaginationContext]',
  standalone: true,
  exportAs: 'arkPaginationContext',
})
export class ArkPaginationContext {
  static ngTemplateContextGuard(
    _directive: ArkPaginationContext,
    context: unknown,
  ): context is PaginationContextTemplate {
    return true
  }

  private readonly pagination = injectArkPaginationContext()
  private readonly templateRef = inject<TemplateRef<PaginationContextTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.pagination.api,
      api: this.pagination.api,
    })

    effect(() => {
      this.pagination.api()
      view.detectChanges()
    })
  }
}
