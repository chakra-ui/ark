import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkImageCropperGrid,
  ArkImageCropperHandle,
  ArkImageCropperImage,
  ArkImageCropperRoot,
  ArkImageCropperSelection,
  ArkImageCropperViewport,
  imageCropperHandles,
  type ImageCropperFlipState,
} from '../public-api'
import { imageCropperExampleStyles } from '../image-cropper-example-styles'

@Component({
  selector: 'image-cropper-flip-example',
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
        <button type="button" [attr.data-variant]="flip()?.horizontal ? 'solid' : null" (click)="toggleHorizontal()">
          Flip horizontal
        </button>
        <button type="button" [attr.data-variant]="flip()?.vertical ? 'solid' : null" (click)="toggleVertical()">
          Flip vertical
        </button>
      </div>

      <div class="root" arkImageCropper [(flip)]="flip">
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
export class ImageCropperFlipExample {
  readonly flip = signal<ImageCropperFlipState | undefined>({ horizontal: false, vertical: false })
  readonly handles = imageCropperHandles

  toggleHorizontal(): void {
    const flip = this.flip() ?? { horizontal: false, vertical: false }
    this.flip.set({ ...flip, horizontal: !flip.horizontal })
  }

  toggleVertical(): void {
    const flip = this.flip() ?? { horizontal: false, vertical: false }
    this.flip.set({ ...flip, vertical: !flip.vertical })
  }
}
