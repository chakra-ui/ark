import { FileUpload, useFileUpload } from '@ark-ui/react/file-upload'
import { ClipboardIcon, XIcon } from 'lucide-react'
import field from 'styles/field.module.css'
import styles from 'styles/file-upload.module.css'

export const PastingFiles = () => {
  const fileUpload = useFileUpload({ maxFiles: 3, accept: 'image/*' })

  return (
    <FileUpload.RootProvider value={fileUpload} className={styles.Root}>
      <FileUpload.Label className={styles.Label}>
        <ClipboardIcon
          style={{ width: '1rem', height: '1rem', display: 'inline', marginRight: '0.25rem', verticalAlign: 'middle' }}
        />
        Upload with Paste
      </FileUpload.Label>
      <textarea
        className={field.Textarea}
        placeholder="Paste an image here (Ctrl/Cmd + V)"
        onPaste={(e) => {
          fileUpload.setClipboardFiles(e.clipboardData)
        }}
      />
      <FileUpload.ItemGroup className={styles.ItemGroup}>
        {fileUpload.acceptedFiles.map((file) => (
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
        ))}
      </FileUpload.ItemGroup>
      <FileUpload.HiddenInput />
    </FileUpload.RootProvider>
  )
}
