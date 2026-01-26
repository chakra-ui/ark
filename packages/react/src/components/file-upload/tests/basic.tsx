import { Field } from '@ark-ui/react/field'
import { FileUpload } from '../'

export const ComponentUnderTest = (props: FileUpload.RootProps) => (
  <FileUpload.Root {...props}>
    <FileUpload.Context>
      {(fileUpload) => {
        if (fileUpload.acceptedFiles.length < 1)
          fileUpload.setFiles([new File([''], 'test.jpg', { type: 'image/jpg' })])
        return (
          <>
            <FileUpload.Label>Drag your file(s) here</FileUpload.Label>
            <FileUpload.Dropzone />
            <FileUpload.ClearTrigger>Clear</FileUpload.ClearTrigger>
            <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>
            <FileUpload.ItemGroup>
              {fileUpload.acceptedFiles.map((file) => (
                <FileUpload.Item key={file.name} file={file}>
                  <FileUpload.ItemPreview type="image/*">
                    <FileUpload.ItemPreviewImage />
                  </FileUpload.ItemPreview>
                  <FileUpload.ItemPreview>FileIcon</FileUpload.ItemPreview>
                  <FileUpload.ItemPreviewImage />
                  <FileUpload.ItemName />
                  <FileUpload.ItemSizeText />
                  <FileUpload.ItemDeleteTrigger>Remove</FileUpload.ItemDeleteTrigger>
                </FileUpload.Item>
              ))}
            </FileUpload.ItemGroup>
          </>
        )
      }}
    </FileUpload.Context>
    <FileUpload.HiddenInput />
  </FileUpload.Root>
)

export const FileUploadWithField = (props: Field.RootProps) => (
  <Field.Root {...props}>
    <FileUpload.Root maxFiles={5}>
      <FileUpload.Label>Label</FileUpload.Label>
      <FileUpload.Trigger>Select</FileUpload.Trigger>
      <FileUpload.ItemGroup />
      <FileUpload.HiddenInput data-testid="input" />
    </FileUpload.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
)
