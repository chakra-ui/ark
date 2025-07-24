import { FileUpload, useFileUpload } from '@ark-ui/react/file-upload'
import { XIcon } from 'lucide-react'

export const WithPaste = () => {
  const fileUpload = useFileUpload({ maxFiles: 3, accept: 'image/*' })

  return (
    <FileUpload.RootProvider value={fileUpload}>
      <FileUpload.Label>File Upload with Paste</FileUpload.Label>
      <textarea
        placeholder="Paste image here..."
        onPaste={(e) => {
          fileUpload.setClipboardFiles(e.clipboardData)
        }}
      />
      <FileUpload.ItemGroup>
        {fileUpload.acceptedFiles.map((file) => (
          <FileUpload.Item key={file.name} file={file}>
            <FileUpload.ItemPreview type="image/*">
              <FileUpload.ItemPreviewImage />
            </FileUpload.ItemPreview>
            <FileUpload.ItemDeleteTrigger>
              <XIcon />
            </FileUpload.ItemDeleteTrigger>
          </FileUpload.Item>
        ))}
      </FileUpload.ItemGroup>
      <FileUpload.HiddenInput />
    </FileUpload.RootProvider>
  )
}
