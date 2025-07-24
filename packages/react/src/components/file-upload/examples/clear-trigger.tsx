import { FileUpload } from '@ark-ui/react/file-upload'

export const ClearTrigger = () => {
  return (
    <FileUpload.Root maxFiles={5} accept="image/png,image/jpeg">
      <FileUpload.Label>File Upload</FileUpload.Label>
      <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>
      <FileUpload.ClearTrigger>Clear Files</FileUpload.ClearTrigger>
      <FileUpload.ItemGroup>
        <FileUpload.Context>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file) => (
              <FileUpload.Item key={file.name} file={file}>
                <FileUpload.ItemPreview type="image/*">
                  <FileUpload.ItemPreviewImage />
                </FileUpload.ItemPreview>
                <FileUpload.ItemName />
              </FileUpload.Item>
            ))
          }
        </FileUpload.Context>
      </FileUpload.ItemGroup>
      <FileUpload.HiddenInput />
    </FileUpload.Root>
  )
}
