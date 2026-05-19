import { Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { DateInputDateSegment } from './date-input.types'
import { injectArkDateInputSegmentGroupContext } from './date-input-segment-group'
import { injectArkDateInputContext } from './use-date-input-context'

export interface DateInputSegmentContextTemplate {
  $implicit: DateInputDateSegment
  segment: DateInputDateSegment
  index: number
}

@Directive({
  selector: '[arkDateInputSegmentContext]',
  standalone: true,
  exportAs: 'arkDateInputSegmentContext',
})
export class ArkDateInputSegmentContext {
  static ngTemplateContextGuard(
    _directive: ArkDateInputSegmentContext,
    context: unknown,
  ): context is DateInputSegmentContextTemplate {
    return true
  }

  private readonly dateInput = injectArkDateInputContext()
  private readonly segmentGroup = injectArkDateInputSegmentGroupContext()
  private readonly templateRef = inject<TemplateRef<DateInputSegmentContextTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    effect(() => {
      const segments = this.dateInput.api().getSegments({ index: this.segmentGroup.index() })
      this.viewContainer.clear()
      segments.forEach((segment, index) => {
        this.viewContainer.createEmbeddedView(this.templateRef, {
          $implicit: segment,
          segment,
          index,
        })
      })
    })
  }
}
