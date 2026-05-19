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
  selector: 'image-cropper-zoom-limits-example',
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
        <button type="button" aria-label="Zoom out" (click)="zoom.set(Math.max(minZoom, (zoom() ?? 1) - 0.1))">
          -
        </button>
        <span class="meter">{{ zoom()?.toFixed(1) }}x</span>
        <button type="button" aria-label="Zoom in" (click)="zoom.set(Math.min(maxZoom, (zoom() ?? 1) + 0.1))">+</button>
      </div>

      <p class="description">Zoom constrained between {{ minZoom }}x and {{ maxZoom }}x</p>

      <div class="root" arkImageCropper [(zoom)]="zoom" [minZoom]="minZoom" [maxZoom]="maxZoom">
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
export class ImageCropperZoomLimitsExample {
  readonly Math = Math
  readonly handles = imageCropperHandles
  readonly maxZoom = 2
  readonly minZoom = 0.5
  readonly zoom = signal<number | undefined>(1)
}
