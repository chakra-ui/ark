import { FileUpload } from '@ark-ui/react/file-upload'
import { FileIcon } from 'lucide-react'

function FileUploadClearTrigger() {
  return (
    <FileUpload.Context>
      {(api) => (
        <button
          type="button"
          hidden={!api.acceptedFiles.length}
          button
          onClick={() => api.clearFiles()}
        >
          Clear Files
        </button>
      )}
    </FileUpload.Context>
  )
}

export const WithClearTrigger = () => {
  return (
    <FileUpload.Root maxFiles={5}>
      <FileUpload.Label>File Upload</FileUpload.Label>
      <FileUpload.Dropzone>Drag your file(s) here</FileUpload.Dropzone>
      <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>
      <FileUploadClearTrigger />
      <FileUpload.ItemGroup>
        <FileUpload.Context>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file) => (
              <FileUpload.Item key={file.name} file={file}>
                <FileUpload.ItemPreview type="image/*">
                  <FileUpload.ItemPreviewImage />
                </FileUpload.ItemPreview>
                <FileUpload.ItemPreview type=".*">
                  <FileIcon />
                </FileUpload.ItemPreview>
                <FileUpload.ItemName />
                <FileUpload.ItemSizeText />
                <FileUpload.ItemDeleteTrigger>X</FileUpload.ItemDeleteTrigger>
              </FileUpload.Item>
            ))
          }
        </FileUpload.Context>
      </FileUpload.ItemGroup>
      <FileUpload.HiddenInput />
    </FileUpload.Root>
  )
}
