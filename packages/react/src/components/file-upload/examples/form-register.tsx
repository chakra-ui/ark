import { FileUpload } from '@ark-ui/react/file-upload'
import { FileIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

interface FieldValues {
  files: File[]
}

export const WithFormRegister = () => {
  const { register, handleSubmit } = useForm<FieldValues>()

  const onSubmit = (data: FieldValues) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FileUpload.Root maxFiles={5}>
        <FileUpload.Label>File Upload</FileUpload.Label>
        <FileUpload.Dropzone>Drag your file(s) here</FileUpload.Dropzone>
        <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>
        <FileUpload.ItemGroup>
          <FileUpload.Context>
            {({ acceptedFiles }) =>
              acceptedFiles.map((file) => (
                <FileUpload.Item key={file.name} file={file}>
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
              ))
            }
          </FileUpload.Context>
        </FileUpload.ItemGroup>
        <FileUpload.HiddenInput {...register('files')} />
      </FileUpload.Root>

      <button type="submit">Submit</button>
    </form>
  )
}
