import { FileUpload } from '@ark-ui/solid/file-upload'
import { For } from 'solid-js'

export const AcceptedFileTypes = () => (
  <FileUpload.Root accept="image/png,image/jpeg">
    <FileUpload.Label>File Upload (PNG and JPEG only)</FileUpload.Label>
    <FileUpload.Dropzone>Drop your files here</FileUpload.Dropzone>
    <FileUpload.Trigger>Select Files</FileUpload.Trigger>

    <FileUpload.ItemGroup>
      <FileUpload.Context>
        {(context) => (
          <For each={context().acceptedFiles}>
            {(file) => (
              <FileUpload.Item file={file}>
                <FileUpload.ItemName />
                <FileUpload.ItemSizeText />
                <FileUpload.ItemDeleteTrigger>Remove</FileUpload.ItemDeleteTrigger>
              </FileUpload.Item>
            )}
          </For>
        )}
      </FileUpload.Context>
    </FileUpload.ItemGroup>

    <FileUpload.ItemGroup>
      <FileUpload.Context>
        {(context) => (
          <For each={context().rejectedFiles}>
            {(fileRejection) => (
              <FileUpload.Item file={fileRejection.file}>
                <FileUpload.ItemName />
                <FileUpload.ItemSizeText />
                <div>
                  <For each={fileRejection.errors}>{(error) => <div style={{ color: 'red' }}>{error}</div>}</For>
                </div>
              </FileUpload.Item>
            )}
          </For>
        )}
      </FileUpload.Context>
    </FileUpload.ItemGroup>

    <FileUpload.HiddenInput />
  </FileUpload.Root>
)
