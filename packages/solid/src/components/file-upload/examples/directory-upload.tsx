import { FileUpload } from '@ark-ui/solid/file-upload'
import { For } from 'solid-js'

export const DirectoryUpload = () => (
  <FileUpload.Root directory>
    <FileUpload.Trigger>Upload Folder</FileUpload.Trigger>
    <FileUpload.ItemGroup>
      <FileUpload.Context>
        {(fileUpload) => (
          <For each={fileUpload().acceptedFiles}>
            {(file) => (
              <FileUpload.Item file={file}>
                <FileUpload.ItemName>{file.webkitRelativePath ?? file.name}</FileUpload.ItemName>
              </FileUpload.Item>
            )}
          </For>
        )}
      </FileUpload.Context>
    </FileUpload.ItemGroup>
    <FileUpload.HiddenInput />
  </FileUpload.Root>
)
