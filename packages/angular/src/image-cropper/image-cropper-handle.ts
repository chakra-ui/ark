import { DestroyRef, Directive, ElementRef, Renderer2, inject, input, type InputSignal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { ImageCropperHandlePosition } from './image-cropper.types'
import { injectArkImageCropperContext } from './use-image-cropper-context'

@Directive({
  selector: '[arkImageCropperHandle]',
  standalone: true,
  exportAs: 'arkImageCropperHandle',
})
export class ArkImageCropperHandle {
  /** The position of the resize handle. */
  readonly position: InputSignal<ImageCropperHandlePosition> = input.required<ImageCropperHandlePosition>()

  constructor() {
    const context = injectArkImageCropperContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getHandleProps({ position: this.position() }),
    })
  }
}
