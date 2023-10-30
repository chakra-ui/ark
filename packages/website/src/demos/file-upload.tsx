import { FileUpload, type FileUploadProps } from '~/components/ui'

export const Basic = (props: FileUploadProps) => (
  <FileUpload.Root {...props}>
    {(api) => (
      <>
        <FileUpload.Dropzone>
          <FileUpload.Label>Drag your file(s) here</FileUpload.Label>
        </FileUpload.Dropzone>
        <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>
        <FileUpload.ItemGroup>
          {api.files.map((file) => (
            <FileUpload.Item key={file.name} file={file}>
              <FileUpload.ItemPreview />
              <FileUpload.ItemName>{file.name}</FileUpload.ItemName>
              <FileUpload.ItemSizeText>{api.getFileSize(file)}</FileUpload.ItemSizeText>
              <FileUpload.ItemDeleteTrigger onClick={() => api.deleteFile(file)}>
                Remove
              </FileUpload.ItemDeleteTrigger>
            </FileUpload.Item>
          ))}
        </FileUpload.ItemGroup>
      </>
    )}
  </FileUpload.Root>
)
