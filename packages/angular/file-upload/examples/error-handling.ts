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
  type FileError,
} from '@ark-ui/angular/file-upload'
import { fileUploadExampleStyles } from '../file-upload-example-styles'

const errorMessages: Record<FileError, string> = {
  TOO_MANY_FILES: 'Too many files selected (max 3 allowed)',
  FILE_INVALID_TYPE: 'Invalid file type (only images and PDFs allowed)',
  FILE_TOO_LARGE: 'File too large (max 1MB)',
  FILE_TOO_SMALL: 'File too small (min 1KB)',
  FILE_INVALID: 'Invalid file',
  FILE_EXISTS: 'File already exists',
}

@Component({
  selector: 'file-upload-error-handling-example',
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
    <div
      arkFileUpload
      #root="arkFileUpload"
      [maxFiles]="3"
      [maxFileSize]="1024 * 1024"
      [minFileSize]="1024"
      accept="image/*,application/pdf"
    >
      <label arkFileUploadLabel>Upload Documents</label>
      <div arkFileUploadDropzone>
        <span class="dropzone-icon">+</span>
        <div class="dropzone-content">
          <span class="dropzone-title">Drop files here</span>
          <span class="dropzone-description">Images and PDFs, max 1MB each</span>
        </div>
      </div>

      @if (root.api().acceptedFiles.length > 0) {
        <div class="section">
          <div class="section-title" data-status="accepted">Accepted Files</div>
          <ul arkFileUploadItemGroup>
            @for (file of root.api().acceptedFiles; track file.name) {
              <li arkFileUploadItem [file]="file">
                <div arkFileUploadItemPreview type="image/*">
                  <img arkFileUploadItemPreviewImage alt="" />
                </div>
                <div arkFileUploadItemPreview type="application/pdf">pdf</div>
                <span arkFileUploadItemName></span>
                <span arkFileUploadItemSizeText></span>
                <button type="button" arkFileUploadItemDeleteTrigger>x</button>
              </li>
            }
          </ul>
        </div>
      }

      @if (root.api().rejectedFiles.length > 0) {
        <div class="section">
          <div class="section-title" data-status="rejected">Rejected Files</div>
          <ul arkFileUploadItemGroup>
            @for (rejection of root.api().rejectedFiles; track rejection.file.name) {
              <li arkFileUploadItem [file]="rejection.file" data-rejected>
                <div class="item-preview">!</div>
                <span arkFileUploadItemName></span>
                <span arkFileUploadItemSizeText></span>
                <div class="error-list">
                  @for (error of rejection.errors; track error) {
                    <span class="error-item">{{ errorMessages[error] || error }}</span>
                  }
                </div>
              </li>
            }
          </ul>
        </div>
      }

      <input arkFileUploadHiddenInput />
    </div>
  `,
  styles: [fileUploadExampleStyles],
})
export class FileUploadErrorHandlingExample {
  readonly errorMessages = errorMessages
}
