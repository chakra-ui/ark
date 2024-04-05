import { Trash2Icon } from 'lucide-react'
import { Button, FileUpload, IconButton } from '~/components/ui'

export const Demo = (props: FileUpload.RootProps) => (
  <FileUpload.Root maxFiles={3} {...props}>
    <FileUpload.Dropzone>
      <FileUpload.Label>Drop your files here</FileUpload.Label>
      <FileUpload.Trigger asChild>
        <Button size="sm">Open Dialog</Button>
      </FileUpload.Trigger>
    </FileUpload.Dropzone>
    <FileUpload.ItemGroup>
      <FileUpload.Context>
        {({ acceptedFiles }) =>
          acceptedFiles.map((file, id) => (
            <FileUpload.Item key={id} file={file}>
              <FileUpload.ItemPreview type="image/*">
                <FileUpload.ItemPreviewImage />
              </FileUpload.ItemPreview>
              <FileUpload.ItemName />
              <FileUpload.ItemSizeText />
              <FileUpload.ItemDeleteTrigger asChild>
                <IconButton variant="link" size="sm">
                  <Trash2Icon />
                </IconButton>
              </FileUpload.ItemDeleteTrigger>
            </FileUpload.Item>
          ))
        }
      </FileUpload.Context>
    </FileUpload.ItemGroup>
  </FileUpload.Root>
)
