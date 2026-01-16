import { FileUpload, useFileUpload } from '@ark-ui/solid/file-upload'
import { For } from 'solid-js'

export const PastingFiles = () => {
  const fileUpload = useFileUpload({ maxFiles: 3, accept: 'image/*' })

  return (
    <FileUpload.RootProvider value={fileUpload}>
      <FileUpload.Label>File Upload with Paste</FileUpload.Label>
      <textarea
        placeholder="Paste image here..."
        onPaste={(e) => {
          fileUpload().setClipboardFiles(e.clipboardData)
        }}
      />
      <FileUpload.ItemGroup>
        <For each={fileUpload().acceptedFiles}>
          {(file) => (
            <FileUpload.Item file={file}>
              <FileUpload.ItemPreview type="image/*">
                <FileUpload.ItemPreviewImage />
              </FileUpload.ItemPreview>
              <FileUpload.ItemDeleteTrigger>X</FileUpload.ItemDeleteTrigger>
            </FileUpload.Item>
          )}
        </For>
      </FileUpload.ItemGroup>
      <FileUpload.HiddenInput />
    </FileUpload.RootProvider>
  )
}
