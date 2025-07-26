<script lang="ts">
  import { FileUpload, useFileUpload } from '@ark-ui/svelte/file-upload'

  const id = $props.id()
  const fileUpload = useFileUpload({ id, maxFiles: 3, accept: 'image/*' })
</script>

<FileUpload.RootProvider value={fileUpload}>
  <FileUpload.Label>File Upload with Paste</FileUpload.Label>
  <textarea
    placeholder="Paste image here..."
    onpaste={(e) => fileUpload().setClipboardFiles(e.clipboardData)}
  ></textarea>
  <FileUpload.ItemGroup>
    {#each fileUpload().acceptedFiles as file (file.name)}
      <FileUpload.Item {file}>
        <FileUpload.ItemPreview type="image/*">
          <FileUpload.ItemPreviewImage />
        </FileUpload.ItemPreview>
        <FileUpload.ItemDeleteTrigger>X</FileUpload.ItemDeleteTrigger>
      </FileUpload.Item>
    {/each}
  </FileUpload.ItemGroup>
  <FileUpload.HiddenInput />
</FileUpload.RootProvider>
