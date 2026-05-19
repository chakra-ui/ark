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
  selector: 'image-cropper-root-provider-example',
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
        <button type="button" aria-label="Zoom out" (click)="imageCropper.api().setZoom(imageCropper.api().zoom - 0.1)">
          -
        </button>
        <span class="meter">{{ imageCropper.api().zoom.toFixed(1) }}x</span>
        <button type="button" aria-label="Zoom in" (click)="imageCropper.api().setZoom(imageCropper.api().zoom + 0.1)">
          +
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
export class ImageCropperRootProviderExample {
  private readonly injector = inject(Injector)
  readonly imageCropper = runInInjectionContext(this.injector, () => useImageCropper({ context: () => ({}) }))
  readonly handles = imageCropperHandles
}
