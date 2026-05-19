import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkImageCropperGrid,
  ArkImageCropperHandle,
  ArkImageCropperImage,
  ArkImageCropperRoot,
  ArkImageCropperSelection,
  ArkImageCropperViewport,
} from '../public-api'
import { imageCropperExampleStyles } from '../image-cropper-example-styles'

@Component({
  selector: 'image-cropper-basic-example',
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
    <div arkImageCropper>
      <div arkImageCropperViewport>
        <img arkImageCropperImage src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900" alt="" />
        <div arkImageCropperSelection>
          <div arkImageCropperGrid axis="horizontal"></div>
          <div arkImageCropperGrid axis="vertical"></div>
          <div arkImageCropperHandle position="nw"></div>
          <div arkImageCropperHandle position="ne"></div>
          <div arkImageCropperHandle position="sw"></div>
          <div arkImageCropperHandle position="se"></div>
        </div>
      </div>
    </div>
  `,
  styles: [imageCropperExampleStyles],
})
export class ImageCropperBasicExample {}
