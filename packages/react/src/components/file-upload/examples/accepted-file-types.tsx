import { FileUpload } from '@ark-ui/react/file-upload'
import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from 'lucide-react'
import styles from 'styles/file-upload.module.css'

export const AcceptedFileTypes = () => (
  <FileUpload.Root accept="image/png,image/jpeg" className={styles.Root}>
    <FileUpload.Label className={styles.Label}>Upload Images (PNG and JPEG only)</FileUpload.Label>
    <FileUpload.Dropzone className={styles.Dropzone}>
      <UploadIcon className={styles.DropzoneIcon} />
      <div className={styles.DropzoneContent}>
        <span className={styles.DropzoneTitle}>Drop your images here</span>
        <span className={styles.DropzoneDescription}>Only PNG and JPEG files</span>
      </div>
    </FileUpload.Dropzone>

    <FileUpload.Context>
      {({ acceptedFiles, rejectedFiles }) => (
        <>
          {acceptedFiles.length > 0 && (
            <FileUpload.ItemGroup className={styles.ItemGroup}>
              {acceptedFiles.map((file) => (
                <FileUpload.Item key={file.name} file={file} className={styles.Item}>
                  <FileUpload.ItemPreview type="image/*" className={styles.ItemPreview}>
                    <FileUpload.ItemPreviewImage className={styles.ItemPreviewImage} />
                  </FileUpload.ItemPreview>
                  <FileUpload.ItemPreview type=".*" className={styles.ItemPreview}>
                    <ImageIcon />
                  </FileUpload.ItemPreview>
                  <FileUpload.ItemName className={styles.ItemName} />
                  <FileUpload.ItemSizeText className={styles.ItemSizeText} />
                  <FileUpload.ItemDeleteTrigger className={styles.ItemDeleteTrigger}>
                    <XIcon />
                  </FileUpload.ItemDeleteTrigger>
                </FileUpload.Item>
              ))}
            </FileUpload.ItemGroup>
          )}

          {rejectedFiles.length > 0 && (
            <FileUpload.ItemGroup className={styles.ItemGroup}>
              {rejectedFiles.map((fileRejection) => (
                <FileUpload.Item
                  key={fileRejection.file.name}
                  file={fileRejection.file}
                  className={styles.Item}
                  data-rejected
                >
                  <div className={styles.ItemPreview}>
                    <AlertCircleIcon />
                  </div>
                  <FileUpload.ItemName className={styles.ItemName} />
                  <FileUpload.ItemSizeText className={styles.ItemSizeText} />
                  <div className={styles.ErrorList}>
                    {fileRejection.errors.map((error) => (
                      <div key={error} className={styles.ErrorItem}>
                        {error}
                      </div>
                    ))}
                  </div>
                </FileUpload.Item>
              ))}
            </FileUpload.ItemGroup>
          )}
        </>
      )}
    </FileUpload.Context>

    <FileUpload.HiddenInput />
  </FileUpload.Root>
)
