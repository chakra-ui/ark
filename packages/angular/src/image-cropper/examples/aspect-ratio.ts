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
import { ImageCropperRectangleHorizontalIcon, ImageCropperRectangleVerticalIcon, ImageCropperSquareIcon } from './icons'

const aspects = [
  { label: '16:9', value: 16 / 9 },
  { label: '1:1', value: 1 },
  { label: '9:16', value: 9 / 16 },
]

@Component({
  selector: 'image-cropper-aspect-ratio-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkImageCropperRoot,
    ArkImageCropperViewport,
    ArkImageCropperImage,
    ArkImageCropperSelection,
    ArkImageCropperHandle,
    ArkImageCropperGrid,
    ImageCropperRectangleHorizontalIcon,
    ImageCropperSquareIcon,
    ImageCropperRectangleVerticalIcon,
  ],
  template: `
    <div class="layout">
      <div class="toolbar">
        <button
          type="button"
          [attr.data-variant]="aspectRatio() === horizontalAspect.value ? 'solid' : null"
          (click)="aspectRatio.set(horizontalAspect.value)"
        >
          <image-cropper-rectangle-horizontal-icon />
          {{ horizontalAspect.label }}
        </button>
        <button
          type="button"
          [attr.data-variant]="aspectRatio() === squareAspect.value ? 'solid' : null"
          (click)="aspectRatio.set(squareAspect.value)"
        >
          <image-cropper-square-icon />
          {{ squareAspect.label }}
        </button>
        <button
          type="button"
          [attr.data-variant]="aspectRatio() === verticalAspect.value ? 'solid' : null"
          (click)="aspectRatio.set(verticalAspect.value)"
        >
          <image-cropper-rectangle-vertical-icon />
          {{ verticalAspect.label }}
        </button>
      </div>

      <div class="root" arkImageCropper [aspectRatio]="aspectRatio()">
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
export class ImageCropperAspectRatioExample {
  readonly aspectRatio = signal(16 / 9)
  readonly horizontalAspect = aspects[0]!
  readonly squareAspect = aspects[1]!
  readonly verticalAspect = aspects[2]!
  readonly handles = imageCropperHandles
}
