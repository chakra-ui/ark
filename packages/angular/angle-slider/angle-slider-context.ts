import { DestroyRef, Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { UseAngleSliderReturn } from './use-angle-slider'
import { injectArkAngleSliderContext } from './use-angle-slider-context'

export interface AngleSliderContextTemplate {
  $implicit: UseAngleSliderReturn['api']
  api: UseAngleSliderReturn['api']
}

@Directive({
  selector: '[arkAngleSliderContext]',
  standalone: true,
  exportAs: 'arkAngleSliderContext',
})
export class ArkAngleSliderContext {
  static ngTemplateContextGuard(
    _directive: ArkAngleSliderContext,
    context: unknown,
  ): context is AngleSliderContextTemplate {
    return true
  }

  private readonly angleSlider = injectArkAngleSliderContext()
  private readonly templateRef = inject<TemplateRef<AngleSliderContextTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.angleSlider.api,
      api: this.angleSlider.api,
    })

    effect(() => {
      this.angleSlider.api()
      view.detectChanges()
    })

    inject(DestroyRef).onDestroy(() => view.destroy())
  }
}
