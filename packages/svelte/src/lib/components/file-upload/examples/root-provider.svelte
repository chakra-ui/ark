<script lang="ts">
  import { FileUpload, useFileUpload } from '@ark-ui/svelte/file-upload'
  import { FileIcon } from 'lucide-svelte'

  const id = $props.id()
  const fileUpload = useFileUpload({ id, maxFiles: 5 })
</script>

<div>
  <button onclick={() => fileUpload().clearFiles()}>Clear All Files</button>

  <FileUpload.RootProvider value={fileUpload}>
    <FileUpload.Label>File Upload</FileUpload.Label>
    <FileUpload.Dropzone>Drag your file(s) here</FileUpload.Dropzone>
    <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>
    <FileUpload.ItemGroup>
      <FileUpload.Context>
        {#snippet render(context)}
          {#each context().acceptedFiles as file (file.name)}
            <FileUpload.Item {file}>
              <FileUpload.ItemPreview type="image/*">
                <FileUpload.ItemPreviewImage />
              </FileUpload.ItemPreview>
              <FileUpload.ItemPreview type=".*">
                <FileIcon />
              </FileUpload.ItemPreview>
              <FileUpload.ItemName />
              <FileUpload.ItemSizeText />
              <FileUpload.ItemDeleteTrigger>X</FileUpload.ItemDeleteTrigger>
            </FileUpload.Item>
          {/each}
        {/snippet}
      </FileUpload.Context>
    </FileUpload.ItemGroup>
    <FileUpload.HiddenInput />
  </FileUpload.RootProvider>
</div>
