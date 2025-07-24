import { FileUpload } from '@ark-ui/solid/file-upload'
import { compressAccurately } from 'image-conversion'
import { For } from 'solid-js'

export const FileTransformations = () => {
  const transformFiles = async (files: File[]) => {
    return Promise.all(
      files.map(async (file) => {
        if (file.type.startsWith('image/')) {
          try {
            const blob = await compressAccurately(file, 200)
            return new File([blob], file.name, { type: blob.type })
          } catch (error) {
            console.error('Compression failed for:', file.name, error)
            return file
          }
        }
        return file
      }),
    )
  }

  return (
    <FileUpload.Root accept="image/*" maxFiles={5} transformFiles={transformFiles}>
      <FileUpload.Label>File Upload with Compression</FileUpload.Label>
      <FileUpload.Trigger>Choose Images</FileUpload.Trigger>

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
                  <FileUpload.ItemSizeText />
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
}
