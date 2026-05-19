import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkImageCropperContext } from './use-image-cropper-context'

@Directive({
  selector: '[arkImageCropperSelection]',
  standalone: true,
  exportAs: 'arkImageCropperSelection',
})
export class ArkImageCropperSelection {
  constructor() {
    const context = injectArkImageCropperContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getSelectionProps(),
    })
  }
}
