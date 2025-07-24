import { FileUpload } from '@ark-ui/react/file-upload'
import { FileIcon } from 'lucide-react'

export const InitialFiles = () => {
  return (
    <FileUpload.Root
      defaultAcceptedFiles={[new File(['Welcome to Ark UI React`'], 'README.md', { type: 'text/plain' })]}
    >
      <FileUpload.Label>File Upload</FileUpload.Label>
      <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>
      <FileUpload.ItemGroup>
        <FileUpload.Context>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file) => (
              <FileUpload.Item key={file.name} file={file}>
                <FileIcon />
                <FileUpload.ItemName />
                <FileUpload.ItemSizeText />
              </FileUpload.Item>
            ))
          }
        </FileUpload.Context>
      </FileUpload.ItemGroup>
      <FileUpload.HiddenInput />
    </FileUpload.Root>
  )
}
