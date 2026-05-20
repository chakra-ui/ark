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
import { ImageCropperZoomInIcon, ImageCropperZoomOutIcon } from './icons'

@Component({
  selector: 'image-cropper-controlled-zoom-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkImageCropperRoot,
    ArkImageCropperViewport,
    ArkImageCropperImage,
    ArkImageCropperSelection,
    ArkImageCropperHandle,
    ArkImageCropperGrid,
    ImageCropperZoomOutIcon,
    ImageCropperZoomInIcon,
  ],
  template: `
    <div class="layout">
      <div class="toolbar">
        <button type="button" aria-label="Zoom out" (click)="zoom.set(zoom() - 0.1)">
          <image-cropper-zoom-out-icon />
        </button>
        <span class="meter">{{ zoom().toFixed(1) }}x</span>
        <button type="button" aria-label="Zoom in" (click)="zoom.set(zoom() + 0.1)">
          <image-cropper-zoom-in-icon />
        </button>
      </div>

      <div class="root" arkImageCropper [(zoom)]="zoom">
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
export class ImageCropperControlledZoomExample {
  readonly zoom = signal<number | undefined>(1)
  readonly handles = imageCropperHandles
}
