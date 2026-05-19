import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFieldErrorText, ArkFieldHelperText, ArkFieldRoot } from '@ark-ui/angular/field'
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
  selector: 'file-upload-with-field-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFieldRoot,
    ArkFieldHelperText,
    ArkFieldErrorText,
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
    <div arkFieldRoot>
      <div arkFileUpload #root="arkFileUpload" [maxFiles]="5">
        <label arkFileUploadLabel>Attachments</label>
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
        <input arkFileUploadHiddenInput data-testid="input" />
      </div>
      <p arkFieldHelperText>Upload up to 5 files</p>
      <p arkFieldErrorText>Please upload at least one file</p>
    </div>
  `,
  styles: [fileUploadExampleStyles],
})
export class FileUploadWithFieldExample {}
