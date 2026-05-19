import { Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { UseColorPickerReturn } from './use-color-picker'
import { injectArkColorPickerContext } from './use-color-picker-context'

export interface ColorPickerContextTemplate {
  $implicit: UseColorPickerReturn['api']
  api: UseColorPickerReturn['api']
}

@Directive({
  selector: '[arkColorPickerContext]',
  standalone: true,
  exportAs: 'arkColorPickerContext',
})
export class ArkColorPickerContext {
  static ngTemplateContextGuard(
    _directive: ArkColorPickerContext,
    context: unknown,
  ): context is ColorPickerContextTemplate {
    return true
  }

  private readonly colorPicker = injectArkColorPickerContext()
  private readonly templateRef = inject<TemplateRef<ColorPickerContextTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.colorPicker.api,
      api: this.colorPicker.api,
    })

    effect(() => {
      this.colorPicker.api()
      view.detectChanges()
    })
  }
}
