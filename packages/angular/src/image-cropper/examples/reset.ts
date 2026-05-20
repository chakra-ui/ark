import { ChangeDetectionStrategy, Component, Injector, inject, runInInjectionContext } from '@angular/core'
import {
  ArkImageCropperGrid,
  ArkImageCropperHandle,
  ArkImageCropperImage,
  ArkImageCropperRootProvider,
  ArkImageCropperSelection,
  ArkImageCropperViewport,
  imageCropperHandles,
  useImageCropper,
} from '../public-api'
import { imageCropperExampleStyles } from '../image-cropper-example-styles'
import {
  ImageCropperFlipHorizontalIcon,
  ImageCropperRefreshCwIcon,
  ImageCropperRotateCcwIcon,
  ImageCropperRotateCwIcon,
  ImageCropperZoomInIcon,
  ImageCropperZoomOutIcon,
} from './icons'

@Component({
  selector: 'image-cropper-reset-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkImageCropperRootProvider,
    ArkImageCropperViewport,
    ArkImageCropperImage,
    ArkImageCropperSelection,
    ArkImageCropperHandle,
    ArkImageCropperGrid,
    ImageCropperZoomOutIcon,
    ImageCropperZoomInIcon,
    ImageCropperRotateCcwIcon,
    ImageCropperRotateCwIcon,
    ImageCropperFlipHorizontalIcon,
    ImageCropperRefreshCwIcon,
  ],
  template: `
    <div class="layout">
      <div class="toolbar">
        <button type="button" aria-label="Zoom out" (click)="imageCropper.api().zoomBy(-0.1)">
          <image-cropper-zoom-out-icon />
        </button>
        <button type="button" aria-label="Zoom in" (click)="imageCropper.api().zoomBy(0.1)">
          <image-cropper-zoom-in-icon />
        </button>
        <button type="button" aria-label="Rotate counterclockwise" (click)="imageCropper.api().rotateBy(-90)">
          <image-cropper-rotate-ccw-icon />
        </button>
        <button type="button" aria-label="Rotate clockwise" (click)="imageCropper.api().rotateBy(90)">
          <image-cropper-rotate-cw-icon />
        </button>
        <button type="button" aria-label="Flip horizontally" (click)="imageCropper.api().flipHorizontally()">
          <image-cropper-flip-horizontal-icon />
        </button>
        <button type="button" data-variant="surface" (click)="imageCropper.api().reset()">
          <image-cropper-refresh-cw-icon />
          Reset
        </button>
      </div>

      <div class="root" arkImageCropperRootProvider [value]="imageCropper">
        <div arkImageCropperViewport>
          <img
            arkImageCropperImage
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
            alt="Sample"
          />
          <div arkImageCropperSelection>
            @for (position of handles; track position) {
              <div arkImageCropperHandle [position]="position"><span></span></div>
            }
            <div arkImageCropperGrid axis="horizontal"></div>
            <div arkImageCropperGrid axis="vertical"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [imageCropperExampleStyles],
})
export class ImageCropperResetExample {
  private readonly injector = inject(Injector)
  readonly handles = imageCropperHandles
  readonly imageCropper = runInInjectionContext(this.injector, () => useImageCropper({ context: () => ({}) }))
}
