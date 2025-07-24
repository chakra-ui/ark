import { FileUpload } from '@ark-ui/solid/file-upload'
import { For } from 'solid-js'

export const DragAndDrop = () => (
  <FileUpload.Root accept="image/*" maxFiles={3}>
    <FileUpload.Dropzone>Drag and drop your images here</FileUpload.Dropzone>

    <FileUpload.ItemGroup>
      <FileUpload.Context>
        {(fileUpload) => (
          <For each={fileUpload().acceptedFiles}>
            {(file) => (
              <FileUpload.Item file={file} class="file-item">
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
