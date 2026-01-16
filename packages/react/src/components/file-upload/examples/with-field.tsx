import { Field } from '@ark-ui/react/field'
import { FileUpload } from '@ark-ui/react/file-upload'
import { FileIcon, UploadIcon, XIcon } from 'lucide-react'
import field from 'styles/field.module.css'
import styles from 'styles/file-upload.module.css'

export const WithField = () => (
  <Field.Root className={field.Root}>
    <FileUpload.Root maxFiles={5} className={styles.Root}>
      <FileUpload.Label className={styles.Label}>Attachments</FileUpload.Label>
      <FileUpload.Dropzone className={styles.Dropzone}>
        <UploadIcon className={styles.DropzoneIcon} />
        <div className={styles.DropzoneContent}>
          <span className={styles.DropzoneTitle}>Drop files here</span>
          <span className={styles.DropzoneDescription}>or click to browse</span>
        </div>
      </FileUpload.Dropzone>
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
      <FileUpload.HiddenInput data-testid="input" />
    </FileUpload.Root>
    <Field.HelperText className={field.HelperText}>Upload up to 5 files</Field.HelperText>
    <Field.ErrorText className={field.ErrorText}>Please upload at least one file</Field.ErrorText>
  </Field.Root>
)
