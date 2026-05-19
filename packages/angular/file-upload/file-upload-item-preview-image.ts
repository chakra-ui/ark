import { DestroyRef, Directive, ElementRef, Renderer2, effect, inject, signal, type Signal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkFileUploadContext } from './use-file-upload-context'
import { injectArkFileUploadItemContext } from './use-file-upload-item-context'

@Directive({
  selector: 'img[arkFileUploadItemPreviewImage]',
  standalone: true,
  exportAs: 'arkFileUploadItemPreviewImage',
})
export class ArkFileUploadItemPreviewImage {
  private readonly urlSignal = signal<string>('')
  readonly url: Signal<string> = this.urlSignal.asReadonly()

  constructor() {
    const context = injectArkFileUploadContext()
    const item = injectArkFileUploadItemContext()

    effect((onCleanup) => {
      const file = item.file()
      const revoke = context.api().createFileUrl(file, (url) => this.urlSignal.set(url))
      onCleanup(() => revoke())
    })

    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () =>
        context.api().getItemPreviewImageProps({ file: item.file(), type: item.type(), url: this.urlSignal() }),
    })
  }
}
