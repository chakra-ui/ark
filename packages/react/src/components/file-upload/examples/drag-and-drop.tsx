import { FileUpload } from '@ark-ui/react/file-upload'

export const DragAndDrop = () => {
  return (
    <FileUpload.Root accept="image/*" maxFiles={3}>
      <FileUpload.Dropzone>Drag and drop your images here</FileUpload.Dropzone>

      <FileUpload.ItemGroup>
        <FileUpload.Context>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file) => (
              <FileUpload.Item key={file.name} file={file} className="file-item">
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
