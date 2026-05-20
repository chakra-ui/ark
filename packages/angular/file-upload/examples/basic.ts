import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkFileUploadHiddenInput,
  ArkFileUploadItem,
  ArkFileUploadItemDeleteTrigger,
  ArkFileUploadItemGroup,
  ArkFileUploadItemName,
  ArkFileUploadLabel,
  ArkFileUploadRoot,
  ArkFileUploadTrigger,
} from '@ark-ui/angular/file-upload'
import { fileUploadExampleStyles } from '../file-upload-example-styles'
import { FileUploadPaperclipIcon, FileUploadXIcon } from './icons'

@Component({
  selector: 'file-upload-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFileUploadRoot,
    ArkFileUploadLabel,
    ArkFileUploadTrigger,
    ArkFileUploadItemGroup,
    ArkFileUploadItem,
    ArkFileUploadItemName,
    ArkFileUploadItemDeleteTrigger,
    ArkFileUploadHiddenInput,
    FileUploadPaperclipIcon,
    FileUploadXIcon,
  ],
  template: `
    <div arkFileUpload #root="arkFileUpload" [maxFiles]="5">
      <label arkFileUploadLabel>File Upload</label>
      <button type="button" arkFileUploadTrigger>
        <file-upload-paperclip-icon />
        Choose file(s)
      </button>
      <ul arkFileUploadItemGroup>
        @for (file of root.api().acceptedFiles; track file.name) {
          <li arkFileUploadItem class="compact" [file]="file">
            <span arkFileUploadItemName></span>
            <button type="button" arkFileUploadItemDeleteTrigger><file-upload-x-icon /></button>
          </li>
        }
      </ul>
      <input arkFileUploadHiddenInput />
    </div>
  `,
  styles: [fileUploadExampleStyles],
})
export class FileUploadBasicExample {}
