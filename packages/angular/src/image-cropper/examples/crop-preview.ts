import { ChangeDetectionStrategy, Component, Injector, inject, runInInjectionContext, signal } from '@angular/core'
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
  selector: 'image-cropper-crop-preview-example',
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
        <button type="button" data-variant="solid" (click)="cropImage()">Crop image</button>
      </div>

      <div class="root" arkImageCropperRootProvider [value]="imageCropper">
        <div arkImageCropperViewport>
          <img
            arkImageCropperImage
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
            alt="Sample"
            crossorigin="anonymous"
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

      <div class="preview">
        <span class="preview-label">Preview</span>
        @if (preview()) {
          <img class="preview-image" [src]="preview()" alt="Cropped preview" />
        }
      </div>
    </div>
  `,
  styles: [imageCropperExampleStyles],
})
export class ImageCropperCropPreviewExample {
  private readonly injector = inject(Injector)
  readonly handles = imageCropperHandles
  readonly imageCropper = runInInjectionContext(this.injector, () => useImageCropper({ context: () => ({}) }))
  readonly preview = signal<string | null>(null)

  async cropImage(): Promise<void> {
    const result = await this.imageCropper.api().getCroppedImage({ output: 'dataUrl' })
    if (typeof result === 'string') {
      this.preview.set(result)
    }
  }
}
