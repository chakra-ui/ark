import { Directive, TemplateRef, ViewContainerRef, effect, inject, type EmbeddedViewRef } from '@angular/core'
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
  private readonly views: Array<{
    key: string
    view: EmbeddedViewRef<DateInputSegmentContextTemplate>
  }> = []

  constructor() {
    effect(() => {
      const segments = this.dateInput.api().getSegments({ index: this.segmentGroup.index() })
      this.syncSegmentViews(segments)
    })
  }

  private syncSegmentViews(segments: DateInputDateSegment[]): void {
    const nextViews: typeof this.views = []

    segments.forEach((segment, index) => {
      const key = `${index}:${segment.type}`
      const existingIndex = this.views.findIndex((entry) => entry.key === key)
      const entry =
        existingIndex >= 0
          ? this.views.splice(existingIndex, 1)[0]
          : {
              key,
              view: this.viewContainer.createEmbeddedView(this.templateRef, {
                $implicit: segment,
                segment,
                index,
              }),
            }

      entry.view.context.$implicit = segment
      entry.view.context.segment = segment
      entry.view.context.index = index
      nextViews.push(entry)

      const currentIndex = this.viewContainer.indexOf(entry.view)
      if (currentIndex !== index) {
        this.viewContainer.move(entry.view, index)
      }
      entry.view.detectChanges()
    })

    for (const entry of this.views) {
      entry.view.destroy()
    }
    this.views.length = 0
    this.views.push(...nextViews)
  }
}
