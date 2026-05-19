import { Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { UseMarqueeReturn } from './use-marquee'
import { injectArkMarqueeContext } from './use-marquee-context'

export interface MarqueeContextTemplate {
  $implicit: UseMarqueeReturn['api']
  api: UseMarqueeReturn['api']
}

@Directive({
  selector: '[arkMarqueeContext]',
  standalone: true,
  exportAs: 'arkMarqueeContext',
})
export class ArkMarqueeContext {
  static ngTemplateContextGuard(_directive: ArkMarqueeContext, context: unknown): context is MarqueeContextTemplate {
    return true
  }

  private readonly marquee = injectArkMarqueeContext()
  private readonly templateRef = inject<TemplateRef<MarqueeContextTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.marquee.api,
      api: this.marquee.api,
    })

    effect(() => {
      this.marquee.api()
      view.detectChanges()
    })
  }
}
