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
import { FileUploadAlertCircleIcon, FileUploadImageIcon, FileUploadUploadIcon, FileUploadXIcon } from './icons'

@Component({
  selector: 'file-upload-accepted-file-types-example',
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
    FileUploadAlertCircleIcon,
    FileUploadImageIcon,
    FileUploadUploadIcon,
    FileUploadXIcon,
  ],
  template: `
    <div arkFileUpload #root="arkFileUpload" accept="image/png,image/jpeg">
      <label arkFileUploadLabel>Upload Images (PNG and JPEG only)</label>
      <div arkFileUploadDropzone>
        <file-upload-upload-icon class="dropzone-icon" />
        <div class="dropzone-content">
          <span class="dropzone-title">Drop your images here</span>
          <span class="dropzone-description">Only PNG and JPEG files</span>
        </div>
      </div>

      @if (root.api().acceptedFiles.length > 0) {
        <ul arkFileUploadItemGroup>
          @for (file of root.api().acceptedFiles; track file.name) {
            <li arkFileUploadItem [file]="file">
              <div arkFileUploadItemPreview type="image/*">
                <img arkFileUploadItemPreviewImage alt="" />
              </div>
              <div arkFileUploadItemPreview type=".*">
                <file-upload-image-icon />
              </div>
              <span arkFileUploadItemName></span>
              <span arkFileUploadItemSizeText></span>
              <button type="button" arkFileUploadItemDeleteTrigger><file-upload-x-icon /></button>
            </li>
          }
        </ul>
      }

      @if (root.api().rejectedFiles.length > 0) {
        <ul arkFileUploadItemGroup>
          @for (rejection of root.api().rejectedFiles; track rejection.file.name) {
            <li arkFileUploadItem [file]="rejection.file" data-rejected>
              <div class="item-preview"><file-upload-alert-circle-icon /></div>
              <span arkFileUploadItemName></span>
              <span arkFileUploadItemSizeText></span>
              <div class="error-list">
                @for (error of rejection.errors; track error) {
                  <span class="error-item">{{ error }}</span>
                }
              </div>
            </li>
          }
        </ul>
      }

      <input arkFileUploadHiddenInput />
    </div>
  `,
  styles: [fileUploadExampleStyles],
})
export class FileUploadAcceptedFileTypesExample {}
