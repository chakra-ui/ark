import { FileUpload } from '@ark-ui/react/file-upload'
import { FileIcon, UploadIcon, XIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import button from 'styles/button.module.css'
import styles from 'styles/file-upload.module.css'

interface FieldValues {
  files: File[]
}

export const FormUsage = () => {
  const { register, handleSubmit } = useForm<FieldValues>()

  const onSubmit = (data: FieldValues) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="stack">
      <FileUpload.Root maxFiles={5} className={styles.Root}>
        <FileUpload.Label className={styles.Label}>File Upload</FileUpload.Label>
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
        <FileUpload.HiddenInput {...register('files')} />
      </FileUpload.Root>
      <button type="submit" className={button.Root} data-variant="solid">
        Submit
      </button>
    </form>
  )
}
