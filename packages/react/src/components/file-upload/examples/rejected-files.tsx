import { FileUpload } from '@ark-ui/react'
import { XIcon } from 'lucide-react'

export const RejectedFiles = () => {
  return (
    <FileUpload.Root
      maxFiles={2}
      onFileReject={(fileRejection) => {
        console.log(fileRejection)
      }}
    >
      <FileUpload.Dropzone>Drag and drop your images here</FileUpload.Dropzone>

      {/* Accepted Files */}
      <FileUpload.ItemGroup type="accepted">
        <h3>Accepted Files</h3>
        <FileUpload.Context>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file) => (
              <FileUpload.Item key={file.name} file={file}>
                <FileUpload.ItemPreview type="image/*">
                  <FileUpload.ItemPreviewImage />
                </FileUpload.ItemPreview>
                <FileUpload.ItemName />
                <FileUpload.ItemDeleteTrigger>
                  <XIcon />
                </FileUpload.ItemDeleteTrigger>
              </FileUpload.Item>
            ))
          }
        </FileUpload.Context>
      </FileUpload.ItemGroup>

      {/* Rejected Files */}
      <FileUpload.ItemGroup type="rejected">
        <h3>Rejected Files</h3>
        <FileUpload.Context>
          {({ rejectedFiles }) =>
            rejectedFiles.map(({ file, errors }) => (
              <FileUpload.Item key={file.name} file={file}>
                <FileUpload.ItemName /> {errors.join(', ')}
                <FileUpload.ItemSizeText />
                <FileUpload.ItemDeleteTrigger>
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
