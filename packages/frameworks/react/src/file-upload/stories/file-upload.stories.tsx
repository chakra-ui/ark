import type { Meta } from '@storybook/react'
import { FileUpload } from '../'
import './file-upload.css'
import { FileIcon } from './icons'

const meta: Meta = {
  title: 'FileUpload',
}

export default meta

export const Basic = () => (
  <FileUpload.Root maxFiles={5}>
    <FileUpload.Label>File Upload</FileUpload.Label>
    <FileUpload.Dropzone>Drag your file(s) here</FileUpload.Dropzone>
    <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>
    <FileUpload.ItemGroup>
      {(files) =>
        files.map((file, id) => (
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
    </FileUpload.ItemGroup>
  </FileUpload.Root>
)
