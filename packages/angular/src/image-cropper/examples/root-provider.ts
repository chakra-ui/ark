import { ChangeDetectionStrategy, Component, Injector, inject, runInInjectionContext } from '@angular/core'
import {
  ArkImageCropperHandle,
  ArkImageCropperImage,
  ArkImageCropperRootProvider,
  ArkImageCropperSelection,
  ArkImageCropperViewport,
  useImageCropper,
} from '../public-api'
import { imageCropperExampleStyles } from '../image-cropper-example-styles'

@Component({
  selector: 'image-cropper-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkImageCropperRootProvider,
    ArkImageCropperViewport,
    ArkImageCropperImage,
    ArkImageCropperSelection,
    ArkImageCropperHandle,
  ],
  template: `
    <div arkImageCropperRootProvider [value]="imageCropper">
      <div arkImageCropperViewport>
        <img arkImageCropperImage src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900" alt="" />
        <div arkImageCropperSelection>
          <div arkImageCropperHandle position="nw"></div>
          <div arkImageCropperHandle position="ne"></div>
          <div arkImageCropperHandle position="sw"></div>
          <div arkImageCropperHandle position="se"></div>
        </div>
      </div>
    </div>
    <output>{{ imageCropper.api().zoom }}</output>
  `,
  styles: [imageCropperExampleStyles],
})
export class ImageCropperRootProviderExample {
  private readonly injector = inject(Injector)
  readonly imageCropper = runInInjectionContext(this.injector, () =>
    useImageCropper({ context: () => ({ defaultZoom: 1.25 }) }),
  )
}
