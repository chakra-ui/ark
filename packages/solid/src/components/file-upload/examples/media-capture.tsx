import { FileUpload } from '@ark-ui/solid/file-upload'
import { For } from 'solid-js'

export const MediaCapture = () => (
  <FileUpload.Root capture="environment">
    <FileUpload.Trigger>Open Camera</FileUpload.Trigger>
    <FileUpload.ItemGroup>
      <FileUpload.Context>
        {(context) => (
          <For each={context().acceptedFiles}>
            {(file) => (
              <FileUpload.Item file={file}>
                <FileUpload.ItemPreview type="image/*">
                  <FileUpload.ItemPreviewImage />
                </FileUpload.ItemPreview>
                <FileUpload.ItemName>{file.webkitRelativePath || file.name}</FileUpload.ItemName>
              </FileUpload.Item>
            )}
          </For>
        )}
      </FileUpload.Context>
    </FileUpload.ItemGroup>
    <FileUpload.HiddenInput />
  </FileUpload.Root>
)
