import type { Meta } from '@storybook/react'
import { FileUpload } from '../'
import './file-upload.css'
import { FileIcon } from './icons'

const meta: Meta = {
  title: 'Components / File Upload',
}

export default meta

export const Basic = () => {
  return (
    <FileUpload.Root maxFiles={5}>
      <FileUpload.Label>File Upload</FileUpload.Label>
      <FileUpload.Dropzone>Drag your file(s) here</FileUpload.Dropzone>
      <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>
      <FileUpload.ItemGroup>
        <FileUpload.Context>
          {(api) =>
            api.acceptedFiles.map((file, id) => (
              <FileUpload.Item key={id} file={file}>
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
    </FileUpload.Root>
  )
}
