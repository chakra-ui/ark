import { Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { UseDateInputReturn } from './use-date-input'
import { injectArkDateInputContext } from './use-date-input-context'

export interface DateInputContextTemplate {
  $implicit: UseDateInputReturn['api']
  api: UseDateInputReturn['api']
}

@Directive({
  selector: '[arkDateInputContext]',
  standalone: true,
  exportAs: 'arkDateInputContext',
})
export class ArkDateInputContext {
  static ngTemplateContextGuard(
    _directive: ArkDateInputContext,
    context: unknown,
  ): context is DateInputContextTemplate {
    return true
  }

  private readonly dateInput = injectArkDateInputContext()
  private readonly templateRef = inject<TemplateRef<DateInputContextTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.dateInput.api,
      api: this.dateInput.api,
    })

    effect(() => {
      this.dateInput.api()
      view.detectChanges()
    })
  }
}
