import { FileUpload } from '@ark-ui/react/file-upload'

export const AcceptedFileTypes = () => {
  return (
    <FileUpload.Root accept="image/png,image/jpeg">
      <FileUpload.Label>File Upload (PNG and JPEG only)</FileUpload.Label>
      <FileUpload.Dropzone>Drop your files here</FileUpload.Dropzone>
      <FileUpload.Trigger>Select Files</FileUpload.Trigger>

      <FileUpload.ItemGroup>
        <FileUpload.Context>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file) => (
              <FileUpload.Item key={file.name} file={file}>
                <FileUpload.ItemName />
                <FileUpload.ItemSizeText />
                <FileUpload.ItemDeleteTrigger>Remove</FileUpload.ItemDeleteTrigger>
              </FileUpload.Item>
            ))
          }
        </FileUpload.Context>
      </FileUpload.ItemGroup>

      <FileUpload.ItemGroup>
        <FileUpload.Context>
          {({ rejectedFiles }) =>
            rejectedFiles.map((fileRejection) => (
              <FileUpload.Item key={fileRejection.file.name} file={fileRejection.file}>
                <FileUpload.ItemName />
                <FileUpload.ItemSizeText />
                <div>
                  {fileRejection.errors.map((error) => (
                    <div key={error} style={{ color: 'red' }}>
                      {error}
                    </div>
                  ))}
                </div>
              </FileUpload.Item>
            ))
          }
        </FileUpload.Context>
      </FileUpload.ItemGroup>

      <FileUpload.HiddenInput />
    </FileUpload.Root>
  )
}
