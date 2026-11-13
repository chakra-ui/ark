<script lang="ts">
  import { FileUpload } from '$lib/components/file-upload'

  let { file }: { file: File } = $props()
  const initialFile = file
</script>

<FileUpload.Root defaultAcceptedFiles={[initialFile]}>
  <FileUpload.Dropzone>Drop</FileUpload.Dropzone>
  <FileUpload.ItemGroup>
    <FileUpload.Item {file}>
      <FileUpload.ItemPreviewImage alt="preview" />
    </FileUpload.Item>
  </FileUpload.ItemGroup>
</FileUpload.Root>
