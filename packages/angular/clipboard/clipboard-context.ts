import { Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { UseClipboardReturn } from './use-clipboard'
import { injectArkClipboardContext } from './use-clipboard-context'

export interface ClipboardContextTemplate {
  $implicit: UseClipboardReturn['api']
  api: UseClipboardReturn['api']
}

@Directive({
  selector: '[arkClipboardContext]',
  standalone: true,
  exportAs: 'arkClipboardContext',
})
export class ArkClipboardContext {
  static ngTemplateContextGuard(
    _directive: ArkClipboardContext,
    context: unknown,
  ): context is ClipboardContextTemplate {
    return true
  }

  private readonly clipboard = injectArkClipboardContext()
  private readonly templateRef = inject<TemplateRef<ClipboardContextTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.clipboard.api,
      api: this.clipboard.api,
    })

    effect(() => {
      this.clipboard.api()
      view.detectChanges()
    })
  }
}
