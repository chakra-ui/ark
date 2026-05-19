import type * as imageCropper from '@zag-js/image-cropper'
import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  forwardRef,
  inject,
  input,
  model,
  output,
  type InputSignal,
  type InputSignalWithTransform,
  type ModelSignal,
  type OutputEmitterRef,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type {
  ImageCropperCropChangeDetails,
  ImageCropperElementIds,
  ImageCropperFlipState,
  ImageCropperIntlTranslations,
} from './image-cropper.types'
import { ARK_IMAGE_CROPPER_CONTEXT } from './use-image-cropper-context'
import { useImageCropper, type UseImageCropperReturn } from './use-image-cropper'

@Directive({
  selector: '[arkImageCropper]',
  standalone: true,
  exportAs: 'arkImageCropper',
  providers: [{ provide: ARK_IMAGE_CROPPER_CONTEXT, useExisting: forwardRef(() => ArkImageCropperRoot) }],
})
export class ArkImageCropperRoot implements UseImageCropperReturn {
  /** The unique identifier of the image cropper. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the image cropper elements. Useful for composition. */
  readonly ids: InputSignal<Partial<ImageCropperElementIds> | undefined> = input<
    Partial<ImageCropperElementIds> | undefined
  >(undefined)
  /** The localized strings for the image cropper. */
  readonly translations: InputSignal<ImageCropperIntlTranslations | undefined> = input<
    ImageCropperIntlTranslations | undefined
  >(undefined)
  /** The initial rectangle of the crop area. */
  readonly initialCrop: InputSignal<imageCropper.Props['initialCrop']> =
    input<imageCropper.Props['initialCrop']>(undefined)
  /** The minimum width of the crop area. */
  readonly minWidth: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The minimum height of the crop area. */
  readonly minHeight: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The maximum width of the crop area. */
  readonly maxWidth: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The maximum height of the crop area. */
  readonly maxHeight: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The crop area aspect ratio. */
  readonly aspectRatio: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The shape of the crop area. */
  readonly cropShape: InputSignal<'rectangle' | 'circle' | undefined> = input<'rectangle' | 'circle' | undefined>(
    undefined,
  )
  /** The controlled zoom level of the image. */
  readonly zoom: ModelSignal<number | undefined> = model<number | undefined>(undefined)
  /** The controlled rotation of the image in degrees. */
  readonly rotation: ModelSignal<number | undefined> = model<number | undefined>(undefined)
  /** The controlled flip state of the image. */
  readonly flip: ModelSignal<ImageCropperFlipState | undefined> = model<ImageCropperFlipState | undefined>(undefined)
  /** The initial zoom factor to apply to the image. */
  readonly defaultZoom: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The initial rotation to apply to the image in degrees. */
  readonly defaultRotation: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The initial flip state to apply to the image. */
  readonly defaultFlip: InputSignal<ImageCropperFlipState | undefined> = input<ImageCropperFlipState | undefined>(
    undefined,
  )
  /** The amount of zoom applied per wheel step. */
  readonly zoomStep: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** Controls how responsive pinch-to-zoom is. */
  readonly zoomSensitivity: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The minimum zoom factor allowed. */
  readonly minZoom: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The maximum zoom factor allowed. */
  readonly maxZoom: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The base nudge step for keyboard arrow keys. */
  readonly nudgeStep: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The nudge step when Shift is held. */
  readonly nudgeStepShift: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The nudge step when Ctrl or Cmd is held. */
  readonly nudgeStepCtrl: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** Whether the crop area is fixed in size and position. */
  readonly fixedCropArea: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })

  /** Emits when the crop area changes. */
  readonly cropChange: OutputEmitterRef<ImageCropperCropChangeDetails> = output<ImageCropperCropChangeDetails>()

  private readonly machine = useImageCropper({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      translations: this.translations(),
      initialCrop: this.initialCrop(),
      minWidth: this.minWidth(),
      minHeight: this.minHeight(),
      maxWidth: this.maxWidth(),
      maxHeight: this.maxHeight(),
      aspectRatio: this.aspectRatio(),
      cropShape: this.cropShape(),
      zoom: this.zoom(),
      rotation: this.rotation(),
      flip: this.flip(),
      defaultZoom: this.defaultZoom(),
      defaultRotation: this.defaultRotation(),
      defaultFlip: this.defaultFlip(),
      zoomStep: this.zoomStep(),
      zoomSensitivity: this.zoomSensitivity(),
      minZoom: this.minZoom(),
      maxZoom: this.maxZoom(),
      nudgeStep: this.nudgeStep(),
      nudgeStepShift: this.nudgeStepShift(),
      nudgeStepCtrl: this.nudgeStepCtrl(),
      fixedCropArea: this.fixedCropArea(),
      onZoomChange: (details) => {
        if (this.zoom() === details.zoom) return
        this.zoom.set(details.zoom)
      },
      onRotationChange: (details) => {
        if (this.rotation() === details.rotation) return
        this.rotation.set(details.rotation)
      },
      onFlipChange: (details) => {
        if (flipsEqual(this.flip(), details.flip)) return
        this.flip.set({ ...details.flip })
      },
      onCropChange: (details) => {
        this.cropChange.emit(details)
      },
    }),
  })

  readonly state: Signal<imageCropper.Service['state']> = this.machine.state
  readonly api: Signal<imageCropper.Api> = this.machine.api
  readonly service: imageCropper.Service = this.machine.service
  readonly send: imageCropper.Service['send'] = this.machine.send

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }
}

function flipsEqual(a: ImageCropperFlipState | undefined, b: ImageCropperFlipState): boolean {
  return a?.horizontal === b.horizontal && a?.vertical === b.vertical
}
