import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkFileUploadContext } from './use-file-upload-context'
import { injectArkFileUploadItemContext } from './use-file-upload-item-context'

@Directive({
  selector: '[arkFileUploadItemName]',
  standalone: true,
  exportAs: 'arkFileUploadItemName',
})
export class ArkFileUploadItemName {
  constructor() {
    const context = injectArkFileUploadContext()
    const item = injectArkFileUploadItemContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getItemNameProps({ file: item.file(), type: item.type() }),
    })
  }
}
