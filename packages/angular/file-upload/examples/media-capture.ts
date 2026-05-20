import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
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
  ArkFileUploadTrigger,
} from '@ark-ui/angular/file-upload'
import { fileUploadExampleStyles } from '../file-upload-example-styles'
import { FileUploadCameraIcon, FileUploadFileIcon, FileUploadXIcon } from './icons'

@Component({
  selector: 'file-upload-media-capture-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFileUploadRoot,
    ArkFileUploadLabel,
    ArkFileUploadTrigger,
    ArkFileUploadItemGroup,
    ArkFileUploadItem,
    ArkFileUploadItemPreview,
    ArkFileUploadItemPreviewImage,
    ArkFileUploadItemName,
    ArkFileUploadItemSizeText,
    ArkFileUploadItemDeleteTrigger,
    ArkFileUploadHiddenInput,
    FileUploadCameraIcon,
    FileUploadFileIcon,
    FileUploadXIcon,
  ],
  template: `
    <div arkFileUpload #root="arkFileUpload" capture="environment">
      <label arkFileUploadLabel>Capture Photo</label>
      <button type="button" arkFileUploadTrigger>
        <file-upload-camera-icon />
        Open Camera
      </button>
      <ul arkFileUploadItemGroup>
        @for (file of root.api().acceptedFiles; track file.name) {
          <li arkFileUploadItem [file]="file">
            <div arkFileUploadItemPreview type="image/*">
              <img arkFileUploadItemPreviewImage alt="" />
            </div>
            <div arkFileUploadItemPreview type=".*">
              <file-upload-file-icon />
            </div>
            <span arkFileUploadItemName>{{ file.webkitRelativePath || file.name }}</span>
            <span arkFileUploadItemSizeText></span>
            <button type="button" arkFileUploadItemDeleteTrigger><file-upload-x-icon /></button>
          </li>
        }
      </ul>
      <input arkFileUploadHiddenInput />
    </div>
  `,
  styles: [fileUploadExampleStyles],
})
export class FileUploadMediaCaptureExample {}
