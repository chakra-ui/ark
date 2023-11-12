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
    {(api) => (
      <>
        <FileUpload.Dropzone>
          <FileUpload.Label>Drag your file(s) here</FileUpload.Label>
        </FileUpload.Dropzone>
        <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>
        <FileUpload.ItemGroup>
          <For each={api().files}>
            {(file) => (
              <FileUpload.Item file={file}>
                <FileUpload.ItemPreview />
                <FileUpload.ItemName>{file.name}</FileUpload.ItemName>
                <FileUpload.ItemSizeText>{api().getFileSize(file)}</FileUpload.ItemSizeText>
                <FileUpload.ItemDeleteTrigger>Remove</FileUpload.ItemDeleteTrigger>
              </FileUpload.Item>
            )}
          </For>
        </FileUpload.ItemGroup>
      </>
    )}
  </FileUpload.Root>
)
