import { DestroyRef, Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { UseStepsReturn } from './use-steps'
import { injectArkStepsContext } from './use-steps-context'

export interface StepsContextTemplate {
  $implicit: UseStepsReturn['api']
  api: UseStepsReturn['api']
}

@Directive({
  selector: '[arkStepsContext]',
  standalone: true,
  exportAs: 'arkStepsContext',
})
export class ArkStepsContext {
  static ngTemplateContextGuard(_directive: ArkStepsContext, context: unknown): context is StepsContextTemplate {
    return true
  }

  private readonly steps = injectArkStepsContext()
  private readonly templateRef = inject<TemplateRef<StepsContextTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.steps.api,
      api: this.steps.api,
    })

    effect(() => {
      this.steps.api()
      view.detectChanges()
    })

    inject(DestroyRef).onDestroy(() => view.destroy())
  }
}
