import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkFileUploadHiddenInput,
  ArkFileUploadItem,
  ArkFileUploadItemDeleteTrigger,
  ArkFileUploadItemGroup,
  ArkFileUploadItemName,
  ArkFileUploadLabel,
  ArkFileUploadRootProvider,
  ArkFileUploadTrigger,
  useFileUpload,
} from '@ark-ui/angular/file-upload'
import { fileUploadExampleStyles } from '../file-upload-example-styles'

@Component({
  selector: 'file-upload-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFileUploadRootProvider,
    ArkFileUploadLabel,
    ArkFileUploadTrigger,
    ArkFileUploadItemGroup,
    ArkFileUploadItem,
    ArkFileUploadItemName,
    ArkFileUploadItemDeleteTrigger,
    ArkFileUploadHiddenInput,
  ],
  template: `
    <div>
      <button type="button" (click)="fileUpload.api().clearFiles()">Clear Files</button>
      <div arkFileUploadRootProvider [value]="fileUpload">
        <label arkFileUploadLabel>File Upload</label>
        <button type="button" arkFileUploadTrigger>Choose file(s)</button>
        <ul arkFileUploadItemGroup>
          @for (file of fileUpload.api().acceptedFiles; track file.name) {
            <li arkFileUploadItem [file]="file">
              <span arkFileUploadItemName></span>
              <button type="button" arkFileUploadItemDeleteTrigger>x</button>
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
