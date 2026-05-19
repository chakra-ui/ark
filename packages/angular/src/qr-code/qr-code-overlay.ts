import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkQrCodeContext } from './use-qr-code-context'

@Directive({
  selector: '[arkQrCodeOverlay]',
  standalone: true,
  exportAs: 'arkQrCodeOverlay',
})
export class ArkQrCodeOverlay {
  constructor() {
    const context = injectArkQrCodeContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getOverlayProps(),
    })
  }
}
