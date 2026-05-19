import { Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { UseSignaturePadReturn } from './use-signature-pad'
import { injectArkSignaturePadContext } from './use-signature-pad-context'

export interface SignaturePadContextTemplate {
  $implicit: UseSignaturePadReturn['api']
  api: UseSignaturePadReturn['api']
}

@Directive({
  selector: '[arkSignaturePadContext]',
  standalone: true,
  exportAs: 'arkSignaturePadContext',
})
export class ArkSignaturePadContext {
  static ngTemplateContextGuard(
    _directive: ArkSignaturePadContext,
    context: unknown,
  ): context is SignaturePadContextTemplate {
    return true
  }

  private readonly signaturePad = injectArkSignaturePadContext()
  private readonly templateRef = inject<TemplateRef<SignaturePadContextTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.signaturePad.api,
      api: this.signaturePad.api,
    })

    effect(() => {
      this.signaturePad.api()
      view.detectChanges()
    })
  }
}
