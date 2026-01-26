import { FileUpload, type FileUploadFileError } from '@ark-ui/react/file-upload'
import { AlertCircleIcon, CheckCircleIcon, FileIcon, UploadIcon, XIcon } from 'lucide-react'
import styles from 'styles/file-upload.module.css'

const errorMessages: Record<FileUploadFileError, string> = {
  TOO_MANY_FILES: 'Too many files selected (max 3 allowed)',
  FILE_INVALID_TYPE: 'Invalid file type (only images and PDFs allowed)',
  FILE_TOO_LARGE: 'File too large (max 1MB)',
  FILE_TOO_SMALL: 'File too small (min 1KB)',
  FILE_INVALID: 'Invalid file',
  FILE_EXISTS: 'File already exists',
}

export const ErrorHandling = () => (
  <FileUpload.Root
    maxFiles={3}
    maxFileSize={1024 * 1024}
    minFileSize={1024}
    accept="image/*,application/pdf"
    className={styles.Root}
  >
    <FileUpload.Label className={styles.Label}>Upload Documents</FileUpload.Label>
    <FileUpload.Dropzone className={styles.Dropzone}>
      <UploadIcon className={styles.DropzoneIcon} />
      <div className={styles.DropzoneContent}>
        <span className={styles.DropzoneTitle}>Drop files here</span>
        <span className={styles.DropzoneDescription}>Images and PDFs, max 1MB each</span>
      </div>
    </FileUpload.Dropzone>

    <FileUpload.Context>
      {({ acceptedFiles, rejectedFiles }) => (
        <>
          {acceptedFiles.length > 0 && (
            <div className={styles.Section}>
              <div className={styles.SectionTitle} data-status="accepted">
                <CheckCircleIcon
                  style={{
                    width: '0.875rem',
                    height: '0.875rem',
                    display: 'inline',
                    marginRight: '0.25rem',
                    verticalAlign: 'middle',
                  }}
                />
                Accepted Files
              </div>
              <FileUpload.ItemGroup className={styles.ItemGroup}>
                {acceptedFiles.map((file) => (
                  <FileUpload.Item key={file.name} file={file} className={styles.Item}>
                    <FileUpload.ItemPreview type="image/*" className={styles.ItemPreview}>
                      <FileUpload.ItemPreviewImage className={styles.ItemPreviewImage} />
                    </FileUpload.ItemPreview>
                    <FileUpload.ItemPreview type="application/pdf" className={styles.ItemPreview}>
                      <FileIcon />
                    </FileUpload.ItemPreview>
                    <FileUpload.ItemName className={styles.ItemName} />
                    <FileUpload.ItemSizeText className={styles.ItemSizeText} />
                    <FileUpload.ItemDeleteTrigger className={styles.ItemDeleteTrigger}>
                      <XIcon />
                    </FileUpload.ItemDeleteTrigger>
                  </FileUpload.Item>
                ))}
              </FileUpload.ItemGroup>
            </div>
          )}

          {rejectedFiles.length > 0 && (
            <div className={styles.Section}>
              <div className={styles.SectionTitle} data-status="rejected">
                <AlertCircleIcon
                  style={{
                    width: '0.875rem',
                    height: '0.875rem',
                    display: 'inline',
                    marginRight: '0.25rem',
                    verticalAlign: 'middle',
                  }}
                />
                Rejected Files
              </div>
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
                      {fileRejection.errors.map((error, index) => (
                        <div key={index} className={styles.ErrorItem}>
                          {errorMessages[error as FileUploadFileError] || error}
                        </div>
                      ))}
                    </div>
                  </FileUpload.Item>
                ))}
              </FileUpload.ItemGroup>
            </div>
          )}
        </>
      )}
    </FileUpload.Context>

    <FileUpload.HiddenInput />
  </FileUpload.Root>
)
