import { FileUpload } from '@ark-ui/solid/file-upload'
import { FileIcon } from 'lucide-solid'
import { For } from 'solid-js'

export const SingleFile = () => (
  <FileUpload.Root maxFiles={1}>
    <FileUpload.Label>Single File Upload</FileUpload.Label>
    <FileUpload.Dropzone>Drop a single file here</FileUpload.Dropzone>
    <FileUpload.Trigger>Choose file</FileUpload.Trigger>

    <FileUpload.ItemGroup>
      <FileUpload.Context>
        {(context) => (
          <For each={context().acceptedFiles}>
            {(file) => (
              <FileUpload.Item file={file}>
                <FileUpload.ItemPreview type="image/*">
                  <FileUpload.ItemPreviewImage />
                </FileUpload.ItemPreview>
                <FileUpload.ItemPreview type=".*">
                  <FileIcon />
                </FileUpload.ItemPreview>
                <div>
                  <FileUpload.ItemName />
                  <FileUpload.ItemSizeText />
                </div>
                <FileUpload.ItemDeleteTrigger>Remove</FileUpload.ItemDeleteTrigger>
              </FileUpload.Item>
            )}
          </For>
        )}
      </FileUpload.Context>
    </FileUpload.ItemGroup>

    <FileUpload.HiddenInput />
  </FileUpload.Root>
)
