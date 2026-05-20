import { DestroyRef, Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { UseToggleGroupReturn } from './use-toggle-group'
import { injectArkToggleGroupContext } from './use-toggle-group-context'

export interface ToggleGroupContextTemplate {
  $implicit: UseToggleGroupReturn['api']
  api: UseToggleGroupReturn['api']
}

@Directive({
  selector: '[arkToggleGroupContext]',
  standalone: true,
  exportAs: 'arkToggleGroupContext',
})
export class ArkToggleGroupContext {
  static ngTemplateContextGuard(
    _directive: ArkToggleGroupContext,
    context: unknown,
  ): context is ToggleGroupContextTemplate {
    return true
  }

  private readonly context = injectArkToggleGroupContext()
  private readonly templateRef = inject<TemplateRef<ToggleGroupContextTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.context.api,
      api: this.context.api,
    })

    effect(() => {
      this.context.api()
      view.detectChanges()
    })

    inject(DestroyRef).onDestroy(() => view.destroy())
  }
}
