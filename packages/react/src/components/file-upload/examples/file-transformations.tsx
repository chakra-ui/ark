import { FileUpload } from '@ark-ui/react/file-upload'
import { compressAccurately } from 'image-conversion'

export const FileTransformations = () => {
  const transformFiles = async (files: File[]) => {
    return Promise.all(
      files.map(async (file) => {
        if (file.type.startsWith('image/')) {
          try {
            // Compress image to ~200KB
            const blob = await compressAccurately(file, 200)
            return new File([blob], file.name, { type: blob.type })
          } catch (error) {
            console.error('Compression failed for:', file.name, error)
            return file
          }
        }
        return file // Return non-image files as-is
      }),
    )
  }

  return (
    <FileUpload.Root accept="image/*" maxFiles={5} transformFiles={transformFiles}>
      <FileUpload.Label>File Upload with Compression</FileUpload.Label>
      <FileUpload.Trigger>Choose Images</FileUpload.Trigger>

      <FileUpload.ItemGroup>
        <FileUpload.Context>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file) => (
              <FileUpload.Item key={file.name} file={file} className="file-item">
                <FileUpload.ItemPreview type="image/*">
                  <FileUpload.ItemPreviewImage />
                </FileUpload.ItemPreview>
                <FileUpload.ItemName />
                <FileUpload.ItemSizeText />
                <FileUpload.ItemDeleteTrigger>Remove</FileUpload.ItemDeleteTrigger>
              </FileUpload.Item>
            ))
          }
        </FileUpload.Context>
      </FileUpload.ItemGroup>

      <FileUpload.HiddenInput />
    </FileUpload.Root>
  )
}
