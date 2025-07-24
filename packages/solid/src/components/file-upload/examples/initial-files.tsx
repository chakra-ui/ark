import { FileUpload } from '@ark-ui/solid/file-upload'
import { For } from 'solid-js'

export const InitialFiles = () => (
  <FileUpload.Root defaultAcceptedFiles={[new File(['Welcome to Ark UI Solid'], 'README.md', { type: 'text/plain' })]}>
    <FileUpload.Label>File Upload</FileUpload.Label>
    <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>
    <FileUpload.ItemGroup>
      <FileUpload.Context>
        {(context) => (
          <For each={context().acceptedFiles}>
            {(file) => (
              <FileUpload.Item file={file}>
                <div>📄</div>
                <FileUpload.ItemName />
                <FileUpload.ItemSizeText />
              </FileUpload.Item>
            )}
          </For>
        )}
      </FileUpload.Context>
    </FileUpload.ItemGroup>
    <FileUpload.HiddenInput />
  </FileUpload.Root>
)
