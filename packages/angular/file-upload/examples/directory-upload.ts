import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkFileUploadHiddenInput,
  ArkFileUploadItem,
  ArkFileUploadItemDeleteTrigger,
  ArkFileUploadItemGroup,
  ArkFileUploadItemName,
  ArkFileUploadItemSizeText,
  ArkFileUploadLabel,
  ArkFileUploadRoot,
  ArkFileUploadTrigger,
} from '@ark-ui/angular/file-upload'
import { fileUploadExampleStyles } from '../file-upload-example-styles'
import { FileUploadFileIcon, FileUploadFolderIcon, FileUploadXIcon } from './icons'

@Component({
  selector: 'file-upload-directory-upload-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFileUploadRoot,
    ArkFileUploadLabel,
    ArkFileUploadTrigger,
    ArkFileUploadItemGroup,
    ArkFileUploadItem,
    ArkFileUploadItemName,
    ArkFileUploadItemSizeText,
    ArkFileUploadItemDeleteTrigger,
    ArkFileUploadHiddenInput,
    FileUploadFileIcon,
    FileUploadFolderIcon,
    FileUploadXIcon,
  ],
  template: `
    <div arkFileUpload #root="arkFileUpload" directory>
      <label arkFileUploadLabel>Upload Folder</label>
      <button type="button" arkFileUploadTrigger>
        <file-upload-folder-icon />
        Select Folder
      </button>
      <ul arkFileUploadItemGroup>
        @for (file of root.api().acceptedFiles; track file.name) {
          <li arkFileUploadItem [file]="file">
            <div class="item-preview"><file-upload-file-icon /></div>
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
export class FileUploadDirectoryUploadExample {}
