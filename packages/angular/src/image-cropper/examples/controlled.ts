import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkImageCropperContext,
  ArkImageCropperHandle,
  ArkImageCropperImage,
  ArkImageCropperRoot,
  ArkImageCropperSelection,
  ArkImageCropperViewport,
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
    ArkImageCropperContext,
  ],
  template: `
    <div arkImageCropper [(zoom)]="zoom" [(rotation)]="rotation" [(flip)]="flip" (cropChange)="crop.set($event)">
      <div arkImageCropperViewport>
        <img arkImageCropperImage src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900" alt="" />
        <div arkImageCropperSelection>
          <div arkImageCropperHandle position="nw"></div>
          <div arkImageCropperHandle position="ne"></div>
          <div arkImageCropperHandle position="sw"></div>
          <div arkImageCropperHandle position="se"></div>
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
  `,
  styles: [imageCropperExampleStyles],
})
export class ImageCropperControlledExample {
  readonly zoom = signal<number | undefined>(1)
  readonly rotation = signal<number | undefined>(0)
  readonly flip = signal<ImageCropperFlipState | undefined>({ horizontal: false, vertical: false })
  readonly crop = signal<ImageCropperCropChangeDetails | undefined>(undefined)
}
