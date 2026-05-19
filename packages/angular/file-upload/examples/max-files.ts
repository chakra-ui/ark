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

@Component({
  selector: 'file-upload-max-files-example',
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
  ],
  template: `
    <div arkFileUpload #root="arkFileUpload" [maxFiles]="2">
      <label arkFileUploadLabel>Upload Files (Max 2)</label>
      <button type="button" arkFileUploadTrigger>Choose file(s)</button>
      <ul arkFileUploadItemGroup type="accepted">
        @for (file of root.api().acceptedFiles; track file.name) {
          <li arkFileUploadItem [file]="file">
            <span arkFileUploadItemName></span>
            <button type="button" arkFileUploadItemDeleteTrigger>x</button>
          </li>
        }
      </ul>
      <input arkFileUploadHiddenInput />
    </div>
  `,
  styles: [fileUploadExampleStyles],
})
export class FileUploadMaxFilesExample {}
