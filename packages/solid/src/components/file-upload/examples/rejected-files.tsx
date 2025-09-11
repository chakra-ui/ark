import { FileUpload } from '@ark-ui/solid'
import { XIcon } from 'lucide-solid'
import { For } from 'solid-js'

export const RejectedFiles = () => {
  return (
    <FileUpload.Root
      maxFiles={2}
      onFileReject={(fileRejection) => {
        console.log(fileRejection)
      }}
    >
      <FileUpload.Dropzone>Drag and drop your images here</FileUpload.Dropzone>

      {/* Accepted Files */}
      <FileUpload.ItemGroup type="accepted">
        <h3>Accepted Files</h3>
        <FileUpload.Context>
          {(context) => (
            <For each={context().acceptedFiles}>
              {(file) => (
                <FileUpload.Item file={file}>
                  <FileUpload.ItemPreview type="image/*">
                    <FileUpload.ItemPreviewImage />
                  </FileUpload.ItemPreview>
                  <FileUpload.ItemName />
                  <FileUpload.ItemDeleteTrigger>
                    <XIcon />
                  </FileUpload.ItemDeleteTrigger>
                </FileUpload.Item>
              )}
            </For>
          )}
        </FileUpload.Context>
      </FileUpload.ItemGroup>

      {/* Rejected Files */}
      <FileUpload.ItemGroup type="rejected">
        <h3>Rejected Files</h3>
        <FileUpload.Context>
          {(context) => (
            <For each={context().rejectedFiles}>
              {(fileRejection) => (
                <FileUpload.Item file={fileRejection.file}>
                  <FileUpload.ItemName />
                  <FileUpload.ItemSizeText />
                  <FileUpload.ItemDeleteTrigger>
                    <XIcon />
                  </FileUpload.ItemDeleteTrigger>
                </FileUpload.Item>
              )}
            </For>
          )}
        </FileUpload.Context>
      </FileUpload.ItemGroup>

      <FileUpload.HiddenInput />
    </FileUpload.Root>
  )
}
