import { FileUpload } from '@ark-ui/react/file-upload'
import { PaperclipIcon, XIcon } from 'lucide-react'
import styles from 'styles/file-upload.module.css'

export const Basic = () => (
  <FileUpload.Root maxFiles={5} className={styles.Root}>
    <FileUpload.Label className={styles.Label}>File Upload</FileUpload.Label>
    <FileUpload.Trigger className={styles.Trigger}>
      <PaperclipIcon /> Choose file(s)
    </FileUpload.Trigger>
    <FileUpload.ItemGroup className={styles.ItemGroup}>
      <FileUpload.Context>
        {({ acceptedFiles }) =>
          acceptedFiles.map((file) => (
            <FileUpload.Item key={file.name} file={file} className={styles.ItemCompact}>
              <FileUpload.ItemName className={styles.ItemName} />
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
