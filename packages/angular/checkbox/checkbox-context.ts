import { DestroyRef, Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { UseCheckboxReturn } from './use-checkbox'
import { injectArkCheckboxContext } from './use-checkbox-context'

export interface CheckboxContextTemplate {
  $implicit: UseCheckboxReturn['api']
  api: UseCheckboxReturn['api']
}

@Directive({
  selector: '[arkCheckboxContext]',
  standalone: true,
  exportAs: 'arkCheckboxContext',
})
export class ArkCheckboxContext {
  static ngTemplateContextGuard(_directive: ArkCheckboxContext, context: unknown): context is CheckboxContextTemplate {
    return true
  }

  private readonly checkbox = injectArkCheckboxContext()
  private readonly templateRef = inject<TemplateRef<CheckboxContextTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.checkbox.api,
      api: this.checkbox.api,
    })

    effect(() => {
      this.checkbox.api()
      view.detectChanges()
    })

    inject(DestroyRef).onDestroy(() => view.destroy())
  }
}
