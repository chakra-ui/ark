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
  ArkFileUploadRootProvider,
  useFileUpload,
} from '@ark-ui/angular/file-upload'
import { fileUploadExampleStyles } from '../file-upload-example-styles'
import { FileUploadFileIcon, FileUploadUploadIcon, FileUploadXIcon } from './icons'

@Component({
  selector: 'file-upload-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFileUploadRootProvider,
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
    FileUploadFileIcon,
    FileUploadUploadIcon,
    FileUploadXIcon,
  ],
  template: `
    <div class="stack">
      <button class="demo-button" type="button" (click)="fileUpload.api().clearFiles()">Clear Files</button>
      <div arkFileUploadRootProvider [value]="fileUpload">
        <label arkFileUploadLabel>File Upload</label>
        <div arkFileUploadDropzone>
          <file-upload-upload-icon class="dropzone-icon" />
          <div class="dropzone-content">
            <span class="dropzone-title">Drop files here</span>
            <span class="dropzone-description">or click to browse</span>
          </div>
        </div>
        <ul arkFileUploadItemGroup>
          @for (file of fileUpload.api().acceptedFiles; track file.name) {
            <li arkFileUploadItem [file]="file">
              <div arkFileUploadItemPreview type="image/*">
                <img arkFileUploadItemPreviewImage alt="" />
              </div>
              <div arkFileUploadItemPreview type=".*">
                <file-upload-file-icon />
              </div>
              <span arkFileUploadItemName></span>
              <span arkFileUploadItemSizeText></span>
              <button type="button" arkFileUploadItemDeleteTrigger><file-upload-x-icon /></button>
            </li>
          }
        </ul>
        <input arkFileUploadHiddenInput />
      </div>
    </div>
  `,
  styles: [fileUploadExampleStyles],
})
export class FileUploadRootProviderExample {
  readonly fileUpload = useFileUpload({ context: () => ({ maxFiles: 5 }) })
}
