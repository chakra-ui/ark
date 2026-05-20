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
  ArkFileUploadRoot,
  ArkFileUploadTrigger,
} from '@ark-ui/angular/file-upload'
import { fileUploadExampleStyles } from '../file-upload-example-styles'
import { FileUploadImageIcon, FileUploadXIcon } from './icons'

@Component({
  selector: 'file-upload-transform-files-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFileUploadRoot,
    ArkFileUploadLabel,
    ArkFileUploadTrigger,
    ArkFileUploadItemGroup,
    ArkFileUploadItem,
    ArkFileUploadItemPreview,
    ArkFileUploadItemPreviewImage,
    ArkFileUploadItemName,
    ArkFileUploadItemSizeText,
    ArkFileUploadItemDeleteTrigger,
    ArkFileUploadHiddenInput,
    FileUploadImageIcon,
    FileUploadXIcon,
  ],
  template: `
    <div arkFileUpload #root="arkFileUpload" accept="image/*" [maxFiles]="5" [transformFiles]="transformFiles">
      <label arkFileUploadLabel>Upload with Compression</label>
      <button type="button" arkFileUploadTrigger>
        <file-upload-image-icon />
        Choose Images
      </button>
      <ul arkFileUploadItemGroup>
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
      <input arkFileUploadHiddenInput />
    </div>
  `,
  styles: [fileUploadExampleStyles],
})
export class FileUploadTransformFilesExample {
  readonly transformFiles = async (files: File[]): Promise<File[]> => {
    return Promise.all(files.map((file) => this.compressImage(file)))
  }

  private async compressImage(file: File): Promise<File> {
    if (!file.type.startsWith('image/') || typeof createImageBitmap !== 'function') {
      return file
    }

    try {
      const bitmap = await createImageBitmap(file)
      const canvas = document.createElement('canvas')
      canvas.width = bitmap.width
      canvas.height = bitmap.height

      const context = canvas.getContext('2d')
      if (!context) {
        bitmap.close()
        return file
      }

      context.drawImage(bitmap, 0, 0)
      bitmap.close()

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, file.type || 'image/jpeg', 0.72)
      })

      return blob
        ? new File([blob], file.name, { type: blob.type || file.type, lastModified: file.lastModified })
        : file
    } catch (error) {
      console.error('Compression failed for:', file.name, error)
      return file
    }
  }
}
