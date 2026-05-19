import { DestroyRef, Directive, ElementRef, Renderer2, inject, input, type InputSignal } from '@angular/core'
import type { DataUrlType } from '@zag-js/dom-query'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkQrCodeContext } from './use-qr-code-context'

@Directive({
  selector: 'button[arkQrCodeDownloadTrigger]',
  standalone: true,
  exportAs: 'arkQrCodeDownloadTrigger',
})
export class ArkQrCodeDownloadTrigger {
  /** The mime type of the image. */
  readonly mimeType: InputSignal<DataUrlType> = input.required<DataUrlType>()
  /** The quality of the image. */
  readonly quality: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The name of the file. */
  readonly fileName: InputSignal<string> = input.required<string>()

  constructor() {
    const context = injectArkQrCodeContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () =>
        context.api().getDownloadTriggerProps({
          mimeType: this.mimeType(),
          quality: this.quality(),
          fileName: this.fileName(),
        }),
    })
  }
}
