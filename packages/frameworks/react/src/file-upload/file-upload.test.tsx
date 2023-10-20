import { fileUploadAnatomy } from '@ark-ui/anatomy'
import { render } from '@testing-library/react'
import { getExports, getParts } from '../setup-test'
import { FileUpload, type FileUploadProps } from './'

const ComponentUnderTest = (props: FileUploadProps) => (
  <FileUpload.Root {...props}>
    {(api) => (
      <>
        <FileUpload.Dropzone>
          <FileUpload.Label>Drag your file(s) here</FileUpload.Label>
        </FileUpload.Dropzone>
        <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>
        <FileUpload.ItemGroup>
          {api.files.map((file) => (
            <FileUpload.Item key={file.name} file={file}>
              <FileUpload.ItemName>{file.name}</FileUpload.ItemName>
              <FileUpload.ItemSizeText>{api.getFileSize(file)}</FileUpload.ItemSizeText>
              <FileUpload.ItemDeleteTrigger onClick={() => api.deleteFile(file)}>
                Remove
              </FileUpload.ItemDeleteTrigger>
            </FileUpload.Item>
          ))}
        </FileUpload.ItemGroup>
      </>
    )}
  </FileUpload.Root>
)

describe('FileUpload', () => {
  it.skip.each(getParts(fileUploadAnatomy))('should render part! %s', async (part) => {
    render(<ComponentUnderTest />)
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.skip.each(getExports(fileUploadAnatomy))('should export %s', async (part) => {
    // @ts-expect-error TODO
    expect(FileUpload[part]).toBeDefined()
  })
})
