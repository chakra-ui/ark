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
  ],
  template: `
    <div class="layout">
      <div class="toolbar">
        <button type="button" aria-label="Zoom out" (click)="imageCropper.api().zoomBy(-0.1)">-</button>
        <button type="button" aria-label="Zoom in" (click)="imageCropper.api().zoomBy(0.1)">+</button>
        <button type="button" (click)="imageCropper.api().rotateBy(-90)">Rotate left</button>
        <button type="button" (click)="imageCropper.api().rotateBy(90)">Rotate right</button>
        <button type="button" (click)="imageCropper.api().flipHorizontally()">Flip horizontal</button>
        <button type="button" data-variant="surface" (click)="imageCropper.api().reset()">Reset</button>
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
