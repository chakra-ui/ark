import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkImageCropperContext,
  ArkImageCropperGrid,
  ArkImageCropperHandle,
  ArkImageCropperImage,
  ArkImageCropperRoot,
  ArkImageCropperSelection,
  ArkImageCropperViewport,
  imageCropperHandles,
  type ImageCropperCropChangeDetails,
  type ImageCropperFlipState,
} from '../public-api'
import { imageCropperExampleStyles } from '../image-cropper-example-styles'

@Component({
  selector: 'image-cropper-controlled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkImageCropperRoot,
    ArkImageCropperViewport,
    ArkImageCropperImage,
    ArkImageCropperSelection,
    ArkImageCropperHandle,
    ArkImageCropperGrid,
    ArkImageCropperContext,
  ],
  template: `
    <div class="layout">
      <div
        class="root"
        arkImageCropper
        [(zoom)]="zoom"
        [(rotation)]="rotation"
        [(flip)]="flip"
        (cropChange)="crop.set($event)"
      >
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

        <ng-template arkImageCropperContext let-api="api">
          <div class="toolbar">
            <button type="button" (click)="api().zoomBy(0.25)">Zoom in</button>
            <button type="button" (click)="api().rotateBy(90)">Rotate</button>
            <button type="button" (click)="api().flipHorizontally()">Flip</button>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [imageCropperExampleStyles],
})
export class ImageCropperControlledExample {
  readonly zoom = signal<number | undefined>(1)
  readonly rotation = signal<number | undefined>(0)
  readonly flip = signal<ImageCropperFlipState | undefined>({ horizontal: false, vertical: false })
  readonly crop = signal<ImageCropperCropChangeDetails | undefined>(undefined)
  readonly handles = imageCropperHandles
}
