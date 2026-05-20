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
import { FileUploadAlertCircleIcon, FileUploadCheckCircleIcon, FileUploadUploadIcon, FileUploadXIcon } from './icons'

@Component({
  selector: 'file-upload-rejected-files-example',
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
    FileUploadCheckCircleIcon,
    FileUploadUploadIcon,
    FileUploadXIcon,
  ],
  template: `
    <div arkFileUpload #root="arkFileUpload" [maxFiles]="2" (fileReject)="onFileReject($event)">
      <label arkFileUploadLabel>Upload Files (Max 2)</label>
      <div arkFileUploadDropzone>
        <file-upload-upload-icon class="dropzone-icon" />
        <div class="dropzone-content">
          <span class="dropzone-title">Drop files here</span>
          <span class="dropzone-description">Maximum 2 files allowed</span>
        </div>
      </div>

      @if (root.api().acceptedFiles.length > 0) {
        <div class="section">
          <div class="section-title" data-status="accepted">
            <file-upload-check-circle-icon class="status-icon" />
            Accepted Files
          </div>
          <ul arkFileUploadItemGroup type="accepted">
            @for (file of root.api().acceptedFiles; track file.name) {
              <li arkFileUploadItem [file]="file">
                <div arkFileUploadItemPreview type="image/*">
                  <img arkFileUploadItemPreviewImage alt="" />
                </div>
                <span arkFileUploadItemName></span>
                <span arkFileUploadItemSizeText></span>
                <button type="button" arkFileUploadItemDeleteTrigger><file-upload-x-icon /></button>
              </li>
            }
          </ul>
        </div>
      }

      @if (root.api().rejectedFiles.length > 0) {
        <div class="section">
          <div class="section-title" data-status="rejected">
            <file-upload-alert-circle-icon class="status-icon" />
            Rejected Files
          </div>
          <ul arkFileUploadItemGroup type="rejected">
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
        </div>
      }

      <input arkFileUploadHiddenInput />
    </div>
  `,
  styles: [fileUploadExampleStyles],
})
export class FileUploadRejectedFilesExample {
  onFileReject(details: unknown): void {
    console.log('Rejected files:', details)
  }
}
