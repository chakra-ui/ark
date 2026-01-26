import { FileUpload } from '@ark-ui/react/file-upload'
import { PaperclipIcon, XIcon } from 'lucide-react'
import styles from 'styles/file-upload.module.css'

export const ClearTrigger = () => (
  <FileUpload.Root maxFiles={5} accept="image/png,image/jpeg" className={styles.Root}>
    <FileUpload.Label className={styles.Label}>File Upload</FileUpload.Label>
    <div className={styles.Actions}>
      <FileUpload.Trigger className={styles.Trigger}>
        <PaperclipIcon /> Choose file(s)
      </FileUpload.Trigger>
      <FileUpload.ClearTrigger className={styles.ClearTrigger}>Clear Files</FileUpload.ClearTrigger>
    </div>
    <FileUpload.ItemGroup className={styles.ItemGroup}>
      <FileUpload.Context>
        {({ acceptedFiles }) =>
          acceptedFiles.map((file) => (
            <FileUpload.Item key={file.name} file={file} className={styles.Item}>
              <FileUpload.ItemPreview type="image/*" className={styles.ItemPreview}>
                <FileUpload.ItemPreviewImage className={styles.ItemPreviewImage} />
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
