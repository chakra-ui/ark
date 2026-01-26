import { FileUpload } from '@ark-ui/react/file-upload'
import { FileIcon, FolderIcon, XIcon } from 'lucide-react'
import styles from 'styles/file-upload.module.css'

export const DirectoryUpload = () => (
  <FileUpload.Root directory className={styles.Root}>
    <FileUpload.Label className={styles.Label}>Upload Folder</FileUpload.Label>
    <FileUpload.Trigger className={styles.Trigger}>
      <FolderIcon style={{ width: '1rem', height: '1rem' }} />
      Select Folder
    </FileUpload.Trigger>
    <FileUpload.ItemGroup className={styles.ItemGroup}>
      <FileUpload.Context>
        {({ acceptedFiles }) =>
          acceptedFiles.map((file) => (
            <FileUpload.Item key={file.name} file={file} className={styles.Item}>
              <div className={styles.ItemPreview}>
                <FileIcon />
              </div>
              <FileUpload.ItemName className={styles.ItemName}>
                {file.webkitRelativePath || file.name}
              </FileUpload.ItemName>
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
