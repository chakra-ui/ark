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
  ArkFileUploadRootProvider,
  useFileUpload,
} from '@ark-ui/angular/file-upload'
import { fileUploadExampleStyles } from '../file-upload-example-styles'
import { FileUploadClipboardIcon, FileUploadXIcon } from './icons'

@Component({
  selector: 'file-upload-pasting-files-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFileUploadRootProvider,
    ArkFileUploadLabel,
    ArkFileUploadItemGroup,
    ArkFileUploadItem,
    ArkFileUploadItemPreview,
    ArkFileUploadItemPreviewImage,
    ArkFileUploadItemName,
    ArkFileUploadItemSizeText,
    ArkFileUploadItemDeleteTrigger,
    ArkFileUploadHiddenInput,
    FileUploadClipboardIcon,
    FileUploadXIcon,
  ],
  template: `
    <div arkFileUploadRootProvider [value]="fileUpload">
      <label arkFileUploadLabel>
        <file-upload-clipboard-icon class="status-icon" />
        Upload with Paste
      </label>
      <textarea
        class="field-textarea"
        placeholder="Paste an image here (Ctrl/Cmd + V)"
        (paste)="onPaste($event)"
      ></textarea>
      <ul arkFileUploadItemGroup>
        @for (file of fileUpload.api().acceptedFiles; track file.name) {
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
      <input arkFileUploadHiddenInput />
    </div>
  `,
  styles: [fileUploadExampleStyles],
})
export class FileUploadPastingFilesExample {
  readonly fileUpload = useFileUpload({ context: () => ({ maxFiles: 3, accept: 'image/*' }) })

  onPaste(event: ClipboardEvent): void {
    if (event.clipboardData) {
      this.fileUpload.api().setClipboardFiles(event.clipboardData)
    }
  }
}
