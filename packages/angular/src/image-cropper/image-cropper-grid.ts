import { DestroyRef, Directive, ElementRef, Renderer2, inject, input, type InputSignal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { ImageCropperGridMachineProps } from './image-cropper.types'
import { injectArkImageCropperContext } from './use-image-cropper-context'

@Directive({
  selector: '[arkImageCropperGrid]',
  standalone: true,
  exportAs: 'arkImageCropperGrid',
})
export class ArkImageCropperGrid {
  /** The grid line axis to display. */
  readonly axis: InputSignal<ImageCropperGridMachineProps['axis']> =
    input.required<ImageCropperGridMachineProps['axis']>()

  constructor() {
    const context = injectArkImageCropperContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getGridProps({ axis: this.axis() }),
    })
  }
}
