import { DestroyRef, Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { UseSwitchReturn } from './use-switch'
import { injectArkSwitchContext } from './use-switch-context'

export interface SwitchContextTemplate {
  $implicit: UseSwitchReturn['api']
  api: UseSwitchReturn['api']
}

@Directive({
  selector: '[arkSwitchContext]',
  standalone: true,
  exportAs: 'arkSwitchContext',
})
export class ArkSwitchContext {
  static ngTemplateContextGuard(_directive: ArkSwitchContext, context: unknown): context is SwitchContextTemplate {
    return true
  }

  private readonly context = injectArkSwitchContext()
  private readonly templateRef = inject<TemplateRef<SwitchContextTemplate>>(TemplateRef)
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
