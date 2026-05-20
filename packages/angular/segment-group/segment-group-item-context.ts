import { DestroyRef, Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { UseSegmentGroupItemContext } from './use-segment-group-item-context'
import { injectArkSegmentGroupItemContext } from './use-segment-group-item-context'

export interface SegmentGroupItemContextTemplate {
  $implicit: UseSegmentGroupItemContext
  item: UseSegmentGroupItemContext
}

@Directive({
  selector: '[arkSegmentGroupItemContext]',
  standalone: true,
  exportAs: 'arkSegmentGroupItemContext',
})
export class ArkSegmentGroupItemContext {
  static ngTemplateContextGuard(
    _directive: ArkSegmentGroupItemContext,
    context: unknown,
  ): context is SegmentGroupItemContextTemplate {
    return true
  }

  private readonly item = injectArkSegmentGroupItemContext()
  private readonly templateRef = inject<TemplateRef<SegmentGroupItemContextTemplate>>(TemplateRef)
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
