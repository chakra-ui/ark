import { FileUpload } from '@ark-ui/react/file-upload'

export const WithMediaCapture = () => {
  return (
    <FileUpload.Root capture="environment">
      <FileUpload.Trigger>Open Camera</FileUpload.Trigger>
      <FileUpload.ItemGroup>
        <FileUpload.Context>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file) => (
              <FileUpload.Item key={file.name} file={file}>
                <FileUpload.ItemName>{file.webkitRelativePath ?? file.name}</FileUpload.ItemName>
              </FileUpload.Item>
            ))
          }
        </FileUpload.Context>
      </FileUpload.ItemGroup>
      <FileUpload.HiddenInput />
    </FileUpload.Root>
  )
}
