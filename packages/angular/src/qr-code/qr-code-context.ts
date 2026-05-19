import { Directive, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import type { UseQrCodeReturn } from './use-qr-code'
import { injectArkQrCodeContext } from './use-qr-code-context'

export interface QrCodeContextTemplate {
  $implicit: UseQrCodeReturn['api']
  api: UseQrCodeReturn['api']
}

@Directive({
  selector: '[arkQrCodeContext]',
  standalone: true,
  exportAs: 'arkQrCodeContext',
})
export class ArkQrCodeContext {
  static ngTemplateContextGuard(_directive: ArkQrCodeContext, context: unknown): context is QrCodeContextTemplate {
    return true
  }

  private readonly qrCode = injectArkQrCodeContext()
  private readonly templateRef = inject<TemplateRef<QrCodeContextTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.qrCode.api,
      api: this.qrCode.api,
    })

    effect(() => {
      this.qrCode.api()
      view.detectChanges()
    })
  }
}
