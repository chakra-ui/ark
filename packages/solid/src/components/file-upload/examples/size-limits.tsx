import { FileUpload } from '@ark-ui/solid/file-upload'
import { FileIcon } from 'lucide-solid'
import { For } from 'solid-js'

export const SizeLimits = () => (
  <FileUpload.Root maxFileSize={1024 * 1024} minFileSize={1024}>
    <FileUpload.Label>File Upload (1KB - 1MB)</FileUpload.Label>
    <FileUpload.Dropzone>Drop files here (1KB - 1MB)</FileUpload.Dropzone>
    <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>

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
                <FileUpload.ItemName />
                <FileUpload.ItemSizeText />
                <FileUpload.ItemDeleteTrigger>X</FileUpload.ItemDeleteTrigger>
              </FileUpload.Item>
            )}
          </For>
        )}
      </FileUpload.Context>
    </FileUpload.ItemGroup>

    {/* Show rejected files */}
    <FileUpload.Context>
      {(context) => (
        <>
          {context().rejectedFiles.length > 0 && (
            <div style={{ color: 'red', 'margin-top': '1rem' }}>
              <h4>Rejected Files:</h4>
              <For each={context().rejectedFiles}>
                {(rejectedFile) => (
                  <p>
                    {rejectedFile.file.name} ({rejectedFile.file.size} bytes) - {rejectedFile.errors.join(', ')}
                  </p>
                )}
              </For>
            </div>
          )}
        </>
      )}
    </FileUpload.Context>

    <FileUpload.HiddenInput />
  </FileUpload.Root>
)
