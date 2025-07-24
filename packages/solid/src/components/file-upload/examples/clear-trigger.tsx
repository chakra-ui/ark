import { FileUpload } from '@ark-ui/solid/file-upload'
import { For } from 'solid-js'

export const ClearTrigger = () => (
  <FileUpload.Root maxFiles={5} accept="image/png,image/jpeg">
    <FileUpload.Label>File Upload</FileUpload.Label>
    <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>
    <FileUpload.ClearTrigger>Clear Files</FileUpload.ClearTrigger>
    <FileUpload.ItemGroup>
      <FileUpload.Context>
        {(context) => (
          <For each={context().acceptedFiles}>
            {(file) => (
              <FileUpload.Item file={file}>
                <FileUpload.ItemPreview type="image/*">
                  <FileUpload.ItemPreviewImage />
                </FileUpload.ItemPreview>
                <FileUpload.ItemName />
              </FileUpload.Item>
            )}
          </For>
        )}
      </FileUpload.Context>
    </FileUpload.ItemGroup>
    <FileUpload.HiddenInput />
  </FileUpload.Root>
)
