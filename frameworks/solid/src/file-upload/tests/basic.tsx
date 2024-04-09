import { For } from 'solid-js'
import { FileUpload, type FileUploadRootProps } from '../'

export const ComponentUnderTest = (props: FileUploadRootProps) => (
  <FileUpload.Root {...props}>
    <FileUpload.Context>
      {(api) => {
        if (api().acceptedFiles.length < 1)
          api().setFiles([new File([''], 'test.jpg', { type: 'image/jpg' })])

        return (
          <>
            <FileUpload.Dropzone>
              <FileUpload.Label>Drag your file(s) here</FileUpload.Label>
            </FileUpload.Dropzone>
            <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>
            <FileUpload.ItemGroup>
              <For each={api().acceptedFiles}>
                {(file) => (
                  <FileUpload.Item file={file}>
                    <FileUpload.ItemPreview type="image/*">
                      <FileUpload.ItemPreviewImage />
                    </FileUpload.ItemPreview>
                    <FileUpload.ItemPreview>Any Icon</FileUpload.ItemPreview>
                    <FileUpload.ItemName>{file.name}</FileUpload.ItemName>
                    <FileUpload.ItemSizeText>{api().getFileSize(file)}</FileUpload.ItemSizeText>
                    <FileUpload.ItemDeleteTrigger onClick={() => api().deleteFile(file)}>
                      Remove
                    </FileUpload.ItemDeleteTrigger>
                  </FileUpload.Item>
                )}
              </For>
            </FileUpload.ItemGroup>
          </>
        )
      }}
    </FileUpload.Context>
  </FileUpload.Root>
)
