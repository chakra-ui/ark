import { DestroyRef, Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { UseAccordionReturn } from './use-accordion'
import { injectArkAccordionContext } from './use-accordion-context'

export interface AccordionContextTemplate {
  $implicit: UseAccordionReturn['api']
  api: UseAccordionReturn['api']
}

@Directive({
  selector: '[arkAccordionContext]',
  standalone: true,
  exportAs: 'arkAccordionContext',
})
export class ArkAccordionContext {
  static ngTemplateContextGuard(
    _directive: ArkAccordionContext,
    context: unknown,
  ): context is AccordionContextTemplate {
    return true
  }

  private readonly accordion = injectArkAccordionContext()
  private readonly templateRef = inject<TemplateRef<AccordionContextTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.accordion.api,
      api: this.accordion.api,
    })

    effect(() => {
      this.accordion.api()
      view.detectChanges()
    })

    inject(DestroyRef).onDestroy(() => view.destroy())
  }
}
