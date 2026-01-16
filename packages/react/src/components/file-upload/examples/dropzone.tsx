import { FileUpload } from '@ark-ui/react/file-upload'
import { FileIcon, UploadIcon, XIcon } from 'lucide-react'
import styles from 'styles/file-upload.module.css'

export const Dropzone = () => (
  <FileUpload.Root maxFiles={5} className={styles.Root}>
    <FileUpload.Label className={styles.Label}>File Upload</FileUpload.Label>
    <FileUpload.Dropzone className={styles.Dropzone}>
      <UploadIcon className={styles.DropzoneIcon} />
      <div className={styles.DropzoneContent}>
        <span className={styles.DropzoneTitle}>Drag and drop files here</span>
        <span className={styles.DropzoneDescription}>or click to browse</span>
      </div>
    </FileUpload.Dropzone>
    <FileUpload.ItemGroup className={styles.ItemGroup}>
      <FileUpload.Context>
        {({ acceptedFiles }) =>
          acceptedFiles.map((file) => (
            <FileUpload.Item key={file.name} file={file} className={styles.Item}>
              <FileUpload.ItemPreview type="image/*" className={styles.ItemPreview}>
                <FileUpload.ItemPreviewImage className={styles.ItemPreviewImage} />
              </FileUpload.ItemPreview>
              <FileUpload.ItemPreview type=".*" className={styles.ItemPreview}>
                <FileIcon />
              </FileUpload.ItemPreview>
              <FileUpload.ItemName className={styles.ItemName} />
              <FileUpload.ItemSizeText className={styles.ItemSizeText} />
              <FileUpload.ItemDeleteTrigger className={styles.ItemDeleteTrigger}>
                <XIcon />
              </FileUpload.ItemDeleteTrigger>
            </FileUpload.Item>
          ))
        }
      </FileUpload.Context>
    </FileUpload.ItemGroup>
    <FileUpload.HiddenInput />
  </FileUpload.Root>
)
