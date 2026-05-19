import { DestroyRef, Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { ArkAccordionItemContext as UseAccordionItemContext } from './use-accordion-item-context'
import { injectArkAccordionItemContext } from './use-accordion-item-context'

export interface AccordionItemContextTemplate {
  $implicit: UseAccordionItemContext
  item: UseAccordionItemContext
}

@Directive({
  selector: '[arkAccordionItemContext]',
  standalone: true,
  exportAs: 'arkAccordionItemContext',
})
export class ArkAccordionItemContextDirective {
  static ngTemplateContextGuard(
    _directive: ArkAccordionItemContextDirective,
    context: unknown,
  ): context is AccordionItemContextTemplate {
    return true
  }

  private readonly item = injectArkAccordionItemContext()
  private readonly templateRef = inject<TemplateRef<AccordionItemContextTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.item,
      item: this.item,
    })

    effect(() => {
      this.item.state()
      view.detectChanges()
    })

    inject(DestroyRef).onDestroy(() => view.destroy())
  }
}
