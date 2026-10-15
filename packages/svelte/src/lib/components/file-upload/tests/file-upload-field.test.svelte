<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import { FileUpload } from '@ark-ui/svelte/file-upload'
</script>

<Field.Root invalid>
  <Field.Label>Label</Field.Label>
  <FileUpload.Root>
    <FileUpload.Dropzone>
      <FileUpload.Trigger>Select</FileUpload.Trigger>
    </FileUpload.Dropzone>
    <FileUpload.HiddenInput />
  </FileUpload.Root>
  <Field.HelperText>Additional Info</Field.HelperText>
  <Field.ErrorText>Error Info</Field.ErrorText>
</Field.Root>
