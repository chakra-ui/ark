import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkImageCropperContext,
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
  selector: 'image-cropper-context-example',
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
      <div class="root" arkImageCropper>
        <ng-template arkImageCropperContext let-api="api">
          <div class="toolbar">
            <button type="button" aria-label="Zoom out" (click)="api().zoomBy(-0.1)">-</button>
            <span class="meter">{{ api().zoom.toFixed(1) }}x</span>
            <button type="button" aria-label="Zoom in" (click)="api().zoomBy(0.1)">+</button>
          </div>
        </ng-template>

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
export class ImageCropperContextExample {
  readonly handles = imageCropperHandles
}
