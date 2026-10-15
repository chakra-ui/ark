import { Field } from '@ark-ui/solid/field'
import { FileUpload } from '@ark-ui/solid/file-upload'
import { For } from 'solid-js'

export const ComponentUnderTest = (props: FileUpload.RootProps) => (
  <FileUpload.Root {...props}>
    <FileUpload.Context>
      {(fileUpload) => {
        if (fileUpload().acceptedFiles.length < 1)
          fileUpload().setFiles([new File([''], 'test.jpg', { type: 'image/jpg' })])

        return (
          <>
            <FileUpload.Dropzone>
              <FileUpload.Label>Drag your file(s) here</FileUpload.Label>
            </FileUpload.Dropzone>
            <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>
            <FileUpload.ClearTrigger>Clear</FileUpload.ClearTrigger>
            <FileUpload.ItemGroup>
              <For each={fileUpload().acceptedFiles}>
                {(file) => (
                  <FileUpload.Item file={file}>
                    <FileUpload.ItemPreview type="image/*">
                      <FileUpload.ItemPreviewImage />
                    </FileUpload.ItemPreview>
                    <FileUpload.ItemPreview>Any Icon</FileUpload.ItemPreview>
                    <FileUpload.ItemName>{file.name}</FileUpload.ItemName>
                    <FileUpload.ItemSizeText>{fileUpload().getFileSize(file)}</FileUpload.ItemSizeText>
                    <FileUpload.ItemDeleteTrigger onClick={() => fileUpload().deleteFile(file)}>
                      Remove
                    </FileUpload.ItemDeleteTrigger>
                  </FileUpload.Item>
                )}
              </For>
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
      <FileUpload.Dropzone>Drag your files here</FileUpload.Dropzone>
      <FileUpload.Trigger>Select</FileUpload.Trigger>
      <FileUpload.ItemGroup />
      <FileUpload.HiddenInput data-testid="input" />
    </FileUpload.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
)
