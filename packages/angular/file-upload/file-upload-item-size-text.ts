import { DestroyRef, Directive, ElementRef, Renderer2, effect, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkFileUploadContext } from './use-file-upload-context'
import { injectArkFileUploadItemContext } from './use-file-upload-item-context'

@Directive({
  selector: '[arkFileUploadItemSizeText]',
  standalone: true,
  exportAs: 'arkFileUploadItemSizeText',
})
export class ArkFileUploadItemSizeText {
  constructor() {
    const context = injectArkFileUploadContext()
    const item = injectArkFileUploadItemContext()
    const elementRef = inject<ElementRef<HTMLElement>>(ElementRef)
    const renderer = inject(Renderer2)
    const destroyRef = inject(DestroyRef)
    let ownsTextContent = false

    effect(() => {
      const sizeText = context.api().getFileSize(item.file())
      queueMicrotask(() => {
        if (!ownsTextContent && elementRef.nativeElement.textContent?.trim().length !== 0) return
        ownsTextContent = true
        renderer.setProperty(elementRef.nativeElement, 'textContent', sizeText)
      })
    })

    applyArkProps({
      elementRef,
      renderer,
      destroyRef,
      props: () => context.api().getItemSizeTextProps({ file: item.file(), type: item.type() }),
    })
  }
}
