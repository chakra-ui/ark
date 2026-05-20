import { DestroyRef, Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { UseSegmentGroupReturn } from './use-segment-group'
import { injectArkSegmentGroupContext } from './use-segment-group-context'

export interface SegmentGroupContextTemplate {
  $implicit: UseSegmentGroupReturn['api']
  api: UseSegmentGroupReturn['api']
}

@Directive({
  selector: '[arkSegmentGroupContext]',
  standalone: true,
  exportAs: 'arkSegmentGroupContext',
})
export class ArkSegmentGroupContext {
  static ngTemplateContextGuard(
    _directive: ArkSegmentGroupContext,
    context: unknown,
  ): context is SegmentGroupContextTemplate {
    return true
  }

  private readonly segmentGroup = injectArkSegmentGroupContext()
  private readonly templateRef = inject<TemplateRef<SegmentGroupContextTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.segmentGroup.api,
      api: this.segmentGroup.api,
    })

    effect(() => {
      this.segmentGroup.api()
      view.detectChanges()
    })

    inject(DestroyRef).onDestroy(() => view.destroy())
  }
}
