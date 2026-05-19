import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
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
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getItemSizeTextProps({ file: item.file(), type: item.type() }),
    })
  }
}
