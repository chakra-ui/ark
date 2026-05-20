import { DestroyRef, Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { UseSliderReturn } from './use-slider'
import { injectArkSliderContext } from './use-slider-context'

export interface SliderContextTemplate {
  $implicit: UseSliderReturn['api']
  api: UseSliderReturn['api']
}

@Directive({
  selector: '[arkSliderContext]',
  standalone: true,
  exportAs: 'arkSliderContext',
})
export class ArkSliderContext {
  static ngTemplateContextGuard(_directive: ArkSliderContext, context: unknown): context is SliderContextTemplate {
    return true
  }

  private readonly slider = injectArkSliderContext()
  private readonly templateRef = inject<TemplateRef<SliderContextTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.slider.api,
      api: this.slider.api,
    })

    effect(() => {
      this.slider.api()
      view.detectChanges()
    })

    inject(DestroyRef).onDestroy(() => view.destroy())
  }
}
