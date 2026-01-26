import { FileUpload } from '@ark-ui/react/file-upload'
import { CameraIcon, FileIcon, XIcon } from 'lucide-react'
import styles from 'styles/file-upload.module.css'

export const MediaCapture = () => (
  <FileUpload.Root capture="environment" className={styles.Root}>
    <FileUpload.Label className={styles.Label}>Capture Photo</FileUpload.Label>
    <FileUpload.Trigger className={styles.Trigger}>
      <CameraIcon style={{ width: '1rem', height: '1rem' }} />
      Open Camera
    </FileUpload.Trigger>
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
