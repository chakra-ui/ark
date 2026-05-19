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
  ],
  template: `
    <div arkFileUploadRootProvider [value]="fileUpload">
      <label arkFileUploadLabel>Upload with Paste</label>
      <textarea placeholder="Paste an image here (Ctrl/Cmd + V)" rows="4" (paste)="onPaste($event)"></textarea>
      <ul arkFileUploadItemGroup>
        @for (file of fileUpload.api().acceptedFiles; track file.name) {
          <li arkFileUploadItem [file]="file">
            <div arkFileUploadItemPreview type="image/*">
              <img arkFileUploadItemPreviewImage alt="" />
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
  styles: [
    fileUploadExampleStyles,
    `
      textarea {
        align-self: stretch;
        min-height: 6rem;
        padding: 0.75rem;
        border: 1px solid var(--demo-border-emphasized);
        border-radius: 0.375rem;
        background: transparent;
        color: var(--demo-neutral-fg);
        font: inherit;
      }
    `,
  ],
})
export class FileUploadPastingFilesExample {
  readonly fileUpload = useFileUpload({ context: () => ({ maxFiles: 3, accept: 'image/*' }) })

  onPaste(event: ClipboardEvent): void {
    if (event.clipboardData) {
      this.fileUpload.api().setClipboardFiles(event.clipboardData)
    }
  }
}
