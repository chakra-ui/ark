<script lang="ts">
  import { FileUpload } from '@ark-ui/svelte/file-upload'
  import { FileIcon } from 'lucide-svelte'
</script>

<FileUpload.Root maxFiles={5}>
  <FileUpload.Label>File Upload</FileUpload.Label>
  <FileUpload.Dropzone>Drag your file(s) here</FileUpload.Dropzone>
  <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>

  <!-- Custom Clear Trigger -->
  <FileUpload.Context>
    {#snippet render(context)}
      {#if context().acceptedFiles.length > 0}
        <button type="button" onclick={() => context().clearFiles()}>Clear Files</button>
      {/if}
    {/snippet}
  </FileUpload.Context>

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
</FileUpload.Root>
