import { fileUploadAnatomy } from '@ark-ui/anatomy'
import { render } from '@solidjs/testing-library'
import { For } from 'solid-js'
import { getParts } from '../setup-test'
import { FileUpload, type FileUploadProps } from './'

const ComponentUnderTest = (props: FileUploadProps) => (
  <FileUpload.Root {...props}>
    {(api) => {
      if (api().files.length < 1)
        api().setFiles([new File([''], 'test.jpg', { type: 'image/jpg' })])

      return (
        <>
          <FileUpload.Dropzone>
            <FileUpload.Label>Drag your file(s) here</FileUpload.Label>
          </FileUpload.Dropzone>
          <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>
          <FileUpload.ItemGroup>
            <For each={api().files}>
              {(file) => (
                <FileUpload.Item file={file}>
                  <FileUpload.ItemPreview type="image/*">
                    <FileUpload.ItemPreviewImage />
                  </FileUpload.ItemPreview>
                  <FileUpload.ItemPreview>Any Icon</FileUpload.ItemPreview>
                  <FileUpload.ItemName>{file.name}</FileUpload.ItemName>
                  <FileUpload.ItemSizeText>{api().getFileSize(file)}</FileUpload.ItemSizeText>
                  <FileUpload.ItemDeleteTrigger onClick={() => api().deleteFile(file)}>
                    Remove
                  </FileUpload.ItemDeleteTrigger>
                </FileUpload.Item>
              )}
            </For>
          </FileUpload.ItemGroup>
        </>
      )
    }}
  </FileUpload.Root>
)

describe('FileUpload', () => {
  it.each(getParts(fileUploadAnatomy))('should render part! %s', async (part) => {
    render(() => <ComponentUnderTest />)
    expect(document.querySelector(part)).toBeInTheDocument()
  })
})
