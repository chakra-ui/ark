import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkFileUploadDropzone,
  ArkFileUploadHiddenInput,
  ArkFileUploadItem,
  ArkFileUploadItemDeleteTrigger,
  ArkFileUploadItemGroup,
  ArkFileUploadItemName,
  ArkFileUploadItemPreview,
  ArkFileUploadItemPreviewImage,
  ArkFileUploadItemSizeText,
  ArkFileUploadLabel,
  ArkFileUploadRoot,
} from '@ark-ui/angular/file-upload'
import { fileUploadExampleStyles } from '../file-upload-example-styles'

@Component({
  selector: 'file-upload-with-image-preview-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFileUploadRoot,
    ArkFileUploadLabel,
    ArkFileUploadDropzone,
    ArkFileUploadItemGroup,
    ArkFileUploadItem,
    ArkFileUploadItemPreview,
    ArkFileUploadItemPreviewImage,
    ArkFileUploadItemName,
    ArkFileUploadItemSizeText,
    ArkFileUploadItemDeleteTrigger,
    ArkFileUploadHiddenInput,
  ],
  template: `
    <div arkFileUpload #root="arkFileUpload" [maxFiles]="5">
      <label arkFileUploadLabel>File Upload</label>
      <div arkFileUploadDropzone>Drop image files here</div>
      <ul arkFileUploadItemGroup>
        @for (file of root.api().acceptedFiles; track file.name) {
          <li arkFileUploadItem [file]="file">
            <div arkFileUploadItemPreview #preview="arkFileUploadItemPreview" type="image/*">
              @if (preview.matches()) {
                <img arkFileUploadItemPreviewImage alt="" />
              }
            </div>
            <span arkFileUploadItemName></span>
            <span arkFileUploadItemSizeText></span>
            <button type="button" arkFileUploadItemDeleteTrigger>x</button>
          </li>
        }
      </ul>
      <input arkFileUploadHiddenInput />
    </div>
  `,
  styles: [fileUploadExampleStyles],
})
export class FileUploadWithImagePreviewExample {}
