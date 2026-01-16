import { FileUpload } from '@ark-ui/react/file-upload'
import { AlertCircleIcon, CheckCircleIcon, UploadIcon, XIcon } from 'lucide-react'
import styles from 'styles/file-upload.module.css'

export const RejectedFiles = () => (
  <FileUpload.Root
    maxFiles={2}
    className={styles.Root}
    onFileReject={(details) => {
      console.log('Rejected files:', details)
    }}
  >
    <FileUpload.Label className={styles.Label}>Upload Files (Max 2)</FileUpload.Label>
    <FileUpload.Dropzone className={styles.Dropzone}>
      <UploadIcon className={styles.DropzoneIcon} />
      <div className={styles.DropzoneContent}>
        <span className={styles.DropzoneTitle}>Drop files here</span>
        <span className={styles.DropzoneDescription}>Maximum 2 files allowed</span>
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
              <FileUpload.ItemGroup type="accepted" className={styles.ItemGroup}>
                {acceptedFiles.map((file) => (
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
              <FileUpload.ItemGroup type="rejected" className={styles.ItemGroup}>
                {rejectedFiles.map(({ file, errors }) => (
                  <FileUpload.Item key={file.name} file={file} className={styles.Item} data-rejected>
                    <div className={styles.ItemPreview}>
                      <AlertCircleIcon />
                    </div>
                    <FileUpload.ItemName className={styles.ItemName} />
                    <FileUpload.ItemSizeText className={styles.ItemSizeText} />
                    <div className={styles.ErrorList}>
                      {errors.map((error, index) => (
                        <span key={index} className={styles.ErrorItem}>
                          {error}
                        </span>
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
