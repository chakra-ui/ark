import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkFileUploadContext } from './use-file-upload-context'

@Directive({
  selector: 'input[arkFileUploadHiddenInput]',
  standalone: true,
  exportAs: 'arkFileUploadHiddenInput',
})
export class ArkFileUploadHiddenInput {
  constructor() {
    const context = injectArkFileUploadContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getHiddenInputProps(),
    })
  }
}
