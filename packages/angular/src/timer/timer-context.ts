import { Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { UseTimerReturn } from './use-timer'
import { injectArkTimerContext } from './use-timer-context'

export interface TimerContextTemplate {
  $implicit: UseTimerReturn['api']
  api: UseTimerReturn['api']
}

@Directive({
  selector: '[arkTimerContext]',
  standalone: true,
  exportAs: 'arkTimerContext',
})
export class ArkTimerContext {
  static ngTemplateContextGuard(_directive: ArkTimerContext, context: unknown): context is TimerContextTemplate {
    return true
  }

  private readonly timer = injectArkTimerContext()
  private readonly templateRef = inject<TemplateRef<TimerContextTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.timer.api,
      api: this.timer.api,
    })

    effect(() => {
      this.timer.api()
      view.detectChanges()
    })
  }
}
