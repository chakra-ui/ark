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

@Component({
  selector: 'file-upload-form-usage-example',
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
    <form class="stack" (submit)="onSubmit($event)">
      <div arkFileUpload #root="arkFileUpload" [maxFiles]="5">
        <label arkFileUploadLabel>File Upload</label>
        <div arkFileUploadDropzone>
          <span class="dropzone-icon">+</span>
          <div class="dropzone-content">
            <span class="dropzone-title">Drop files here</span>
            <span class="dropzone-description">or click to browse</span>
          </div>
        </div>
        <ul arkFileUploadItemGroup>
          @for (file of root.api().acceptedFiles; track file.name) {
            <li arkFileUploadItem [file]="file">
              <div arkFileUploadItemPreview type="image/*">
                <img arkFileUploadItemPreviewImage alt="" />
              </div>
              <div arkFileUploadItemPreview type=".*">file</div>
              <span arkFileUploadItemName></span>
              <span arkFileUploadItemSizeText></span>
              <button type="button" arkFileUploadItemDeleteTrigger>x</button>
            </li>
          }
        </ul>
        <input arkFileUploadHiddenInput name="files" />
      </div>
      <button type="submit">Submit</button>
    </form>
  `,
  styles: [fileUploadExampleStyles],
})
export class FileUploadFormUsageExample {
  onSubmit(event: SubmitEvent): void {
    event.preventDefault()
  }
}
