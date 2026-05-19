import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkImageCropperGrid,
  ArkImageCropperHandle,
  ArkImageCropperImage,
  ArkImageCropperRoot,
  ArkImageCropperSelection,
  ArkImageCropperViewport,
  imageCropperHandles,
} from '../public-api'
import { imageCropperExampleStyles } from '../image-cropper-example-styles'

@Component({
  selector: 'image-cropper-rotation-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkImageCropperRoot,
    ArkImageCropperViewport,
    ArkImageCropperImage,
    ArkImageCropperSelection,
    ArkImageCropperHandle,
    ArkImageCropperGrid,
  ],
  template: `
    <div class="layout">
      <div class="toolbar">
        <button type="button" aria-label="Rotate counterclockwise" (click)="rotation.set((rotation() ?? 0) - 90)">
          Rotate left
        </button>
        <button type="button" aria-label="Rotate clockwise" (click)="rotation.set((rotation() ?? 0) + 90)">
          Rotate right
        </button>
        <span class="meter">{{ rotation() }} deg</span>
      </div>

      <div class="root" arkImageCropper [(rotation)]="rotation">
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
export class ImageCropperRotationExample {
  readonly handles = imageCropperHandles
  readonly rotation = signal<number | undefined>(0)
}
