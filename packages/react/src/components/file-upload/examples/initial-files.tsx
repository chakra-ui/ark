import { FileUpload } from '@ark-ui/react/file-upload'
import { FileIcon, PaperclipIcon, XIcon } from 'lucide-react'
import styles from 'styles/file-upload.module.css'

export const InitialFiles = () => (
  <FileUpload.Root
    defaultAcceptedFiles={[new File(['Welcome to Ark UI React'], 'README.md', { type: 'text/plain' })]}
    className={styles.Root}
  >
    <FileUpload.Label className={styles.Label}>File Upload</FileUpload.Label>
    <FileUpload.Trigger className={styles.Trigger}>
      <PaperclipIcon /> Choose file(s)
    </FileUpload.Trigger>
    <FileUpload.ItemGroup className={styles.ItemGroup}>
      <FileUpload.Context>
        {({ acceptedFiles }) =>
          acceptedFiles.map((file) => (
            <FileUpload.Item key={file.name} file={file} className={styles.Item}>
              <div className={styles.ItemPreview}>
                <FileIcon />
              </div>
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
