import { Field } from '@ark-ui/react/field'
import { FileUpload } from '@ark-ui/react/file-upload'

export const WithField = (props: Field.RootProps) => (
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
