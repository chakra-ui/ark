import { DestroyRef, Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { UseDatePickerReturn } from './use-date-picker'
import { injectArkDatePickerContext } from './use-date-picker-context'

export interface DatePickerContextTemplate {
  $implicit: UseDatePickerReturn['api']
  api: UseDatePickerReturn['api']
}

@Directive({
  selector: '[arkDatePickerContext]',
  standalone: true,
  exportAs: 'arkDatePickerContext',
})
export class ArkDatePickerContext {
  static ngTemplateContextGuard(
    _directive: ArkDatePickerContext,
    context: unknown,
  ): context is DatePickerContextTemplate {
    return true
  }

  private readonly datePicker = injectArkDatePickerContext()
  private readonly templateRef = inject<TemplateRef<DatePickerContextTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.datePicker.api,
      api: this.datePicker.api,
    })

    effect(() => {
      this.datePicker.api()
      view.detectChanges()
    })

    inject(DestroyRef).onDestroy(() => view.destroy())
  }
}
