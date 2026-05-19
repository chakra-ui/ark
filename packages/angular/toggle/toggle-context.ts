import { DestroyRef, Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { UseToggleReturn } from './use-toggle'
import { injectArkToggleContext } from './use-toggle-context'

export interface ToggleContextTemplate {
  $implicit: UseToggleReturn['api']
  api: UseToggleReturn['api']
}

@Directive({
  selector: '[arkToggleContext]',
  standalone: true,
  exportAs: 'arkToggleContext',
})
export class ArkToggleContext {
  static ngTemplateContextGuard(_directive: ArkToggleContext, context: unknown): context is ToggleContextTemplate {
    return true
  }

  private readonly toggle = injectArkToggleContext()
  private readonly templateRef = inject<TemplateRef<ToggleContextTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.toggle.api,
      api: this.toggle.api,
    })

    effect(() => {
      this.toggle.api()
      view.detectChanges()
    })

    inject(DestroyRef).onDestroy(() => view.destroy())
  }
}
