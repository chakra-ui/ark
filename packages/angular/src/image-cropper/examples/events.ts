import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkImageCropperGrid,
  ArkImageCropperHandle,
  ArkImageCropperImage,
  ArkImageCropperRoot,
  ArkImageCropperSelection,
  ArkImageCropperViewport,
  imageCropperHandles,
  type ImageCropperCropData,
} from '../public-api'
import { imageCropperExampleStyles } from '../image-cropper-example-styles'

@Component({
  selector: 'image-cropper-events-example',
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
      <div class="root" arkImageCropper (cropChange)="cropData.set($event.crop)" (zoomChange)="zoom.set($event)">
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

      <div class="data-display">
        <div class="data-item">
          <span class="data-label">Zoom</span>
          <span class="data-value">{{ zoom().toFixed(2) }}x</span>
        </div>
        <div class="data-item">
          <span class="data-label">Position</span>
          <span class="data-value">{{ rounded(cropData().x) }}, {{ rounded(cropData().y) }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">Size</span>
          <span class="data-value">{{ rounded(cropData().width) }} x {{ rounded(cropData().height) }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [imageCropperExampleStyles],
})
export class ImageCropperEventsExample {
  readonly cropData = signal<Pick<ImageCropperCropData, 'x' | 'y' | 'width' | 'height'>>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })
  readonly handles = imageCropperHandles
  readonly zoom = signal(1)

  rounded(value: number): number {
    return Math.round(value)
  }
}
