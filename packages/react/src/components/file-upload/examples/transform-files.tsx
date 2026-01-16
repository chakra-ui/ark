import { FileUpload } from '@ark-ui/react/file-upload'
import { compressAccurately } from 'image-conversion'
import { ImageIcon, XIcon } from 'lucide-react'
import styles from 'styles/file-upload.module.css'

export const TransformFiles = () => {
  const transformFiles = async (files: File[]) => {
    return Promise.all(
      files.map(async (file) => {
        if (file.type.startsWith('image/')) {
          try {
            const blob = await compressAccurately(file, 200)
            return new File([blob], file.name, { type: blob.type })
          } catch (error) {
            console.error('Compression failed for:', file.name, error)
            return file
          }
        }
        return file
      }),
    )
  }

  return (
    <FileUpload.Root accept="image/*" maxFiles={5} transformFiles={transformFiles} className={styles.Root}>
      <FileUpload.Label className={styles.Label}>Upload with Compression</FileUpload.Label>
      <FileUpload.Trigger className={styles.Trigger}>
        <ImageIcon style={{ width: '1rem', height: '1rem' }} />
        Choose Images
      </FileUpload.Trigger>
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
}
