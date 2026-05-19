import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  type InputSignal,
  type Signal,
  computed,
  forwardRef,
  inject,
  input,
} from '@angular/core'
import type * as imageCropper from '@zag-js/image-cropper'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_IMAGE_CROPPER_CONTEXT } from './use-image-cropper-context'
import type { UseImageCropperReturn } from './use-image-cropper'

@Directive({
  selector: '[arkImageCropperRootProvider]',
  standalone: true,
  exportAs: 'arkImageCropperRootProvider',
  providers: [{ provide: ARK_IMAGE_CROPPER_CONTEXT, useExisting: forwardRef(() => ArkImageCropperRootProvider) }],
})
export class ArkImageCropperRootProvider implements UseImageCropperReturn {
  /** The image cropper machine returned by useImageCropper(). */
  readonly value: InputSignal<UseImageCropperReturn> = input.required<UseImageCropperReturn>()
  readonly state: Signal<imageCropper.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<imageCropper.Api> = computed(() => this.value().api())
  readonly send: imageCropper.Service['send'] = (event) => this.value().send(event)

  get service(): imageCropper.Service {
    return this.value().service
  }

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }
}
