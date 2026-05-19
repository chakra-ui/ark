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
  ],
  template: `
    <div arkFileUpload #root="arkFileUpload" directory>
      <label arkFileUploadLabel>Upload Folder</label>
      <button type="button" arkFileUploadTrigger>Select Folder</button>
      <ul arkFileUploadItemGroup>
        @for (file of root.api().acceptedFiles; track file.name) {
          <li arkFileUploadItem [file]="file">
            <div class="item-preview">file</div>
            <span arkFileUploadItemName>{{ file.webkitRelativePath || file.name }}</span>
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
export class FileUploadDirectoryUploadExample {}
