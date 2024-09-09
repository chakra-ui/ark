import { FileUpload } from '../'

export const ComponentUnderTest = (props: FileUpload.RootProps) => (
  <FileUpload.Root {...props}>
    <FileUpload.Context>
      {(fileUpload) => {
        if (fileUpload.acceptedFiles.length < 1)
          fileUpload.setFiles([new File([''], 'test.jpg', { type: 'image/jpg' })])

        return (
          <>
            <FileUpload.Label>Drag your file(s) here</FileUpload.Label>
            <FileUpload.Dropzone />
            <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>
            <FileUpload.ItemGroup>
              {fileUpload.acceptedFiles.map((file) => (
                <FileUpload.Item key={file.name} file={file}>
                  <FileUpload.ItemPreview type="image/*">
                    <FileUpload.ItemPreviewImage />
                  </FileUpload.ItemPreview>
                  <FileUpload.ItemPreview>FileIcon</FileUpload.ItemPreview>
                  <FileUpload.ItemPreviewImage />
                  <FileUpload.ItemName />
                  <FileUpload.ItemSizeText />
                  <FileUpload.ItemDeleteTrigger>Remove</FileUpload.ItemDeleteTrigger>
                </FileUpload.Item>
              ))}
            </FileUpload.ItemGroup>
          </>
        )
      }}
    </FileUpload.Context>
    <FileUpload.HiddenInput />
  </FileUpload.Root>
)
