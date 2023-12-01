import { For } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { FileUpload } from './'
import './file-upload.css'

type FileUploadType = typeof FileUpload

const meta: Meta<FileUploadType> = {
  title: 'FileUpload',
  component: FileUpload,
}

export default meta

export const Basic = () => (
  <FileUpload.Root maxFiles={5}>
    <FileUpload.Label>File Upload</FileUpload.Label>
    <FileUpload.Dropzone>Drag your file(s) here</FileUpload.Dropzone>
    <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>
    <FileUpload.ItemGroup>
      {(files) => (
        <For each={files()}>
          {(file) => (
            <FileUpload.Item file={file}>
              <FileUpload.ItemPreview type="image/*">
                <FileUpload.ItemPreviewImage />
              </FileUpload.ItemPreview>
              <FileUpload.ItemPreview type=".*">Any Icon</FileUpload.ItemPreview>
              <FileUpload.ItemName />
              <FileUpload.ItemSizeText />
              <FileUpload.ItemDeleteTrigger>X</FileUpload.ItemDeleteTrigger>
            </FileUpload.Item>
          )}
        </For>
      )}
    </FileUpload.ItemGroup>
  </FileUpload.Root>
)
