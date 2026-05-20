import { DestroyRef, Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { UseRadioGroupReturn } from './use-radio-group'
import { injectArkRadioGroupContext } from './use-radio-group-context'

export interface RadioGroupContextTemplate {
  $implicit: UseRadioGroupReturn['api']
  api: UseRadioGroupReturn['api']
}

@Directive({
  selector: '[arkRadioGroupContext]',
  standalone: true,
  exportAs: 'arkRadioGroupContext',
})
export class ArkRadioGroupContext {
  static ngTemplateContextGuard(
    _directive: ArkRadioGroupContext,
    context: unknown,
  ): context is RadioGroupContextTemplate {
    return true
  }

  private readonly radioGroup = injectArkRadioGroupContext()
  private readonly templateRef = inject<TemplateRef<RadioGroupContextTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.radioGroup.api,
      api: this.radioGroup.api,
    })

    effect(() => {
      this.radioGroup.api()
      view.detectChanges()
    })

    inject(DestroyRef).onDestroy(() => view.destroy())
  }
}
