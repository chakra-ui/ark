<script lang="ts">
  import { FileUpload } from '@ark-ui/svelte/file-upload'
  import { FileIcon } from 'lucide-svelte'
</script>

<FileUpload.Root maxFiles={1}>
  <FileUpload.Label>Single File Upload</FileUpload.Label>
  <FileUpload.Dropzone>Drop a single file here</FileUpload.Dropzone>
  <FileUpload.Trigger>Choose file</FileUpload.Trigger>

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
            <div>
              <FileUpload.ItemName />
              <FileUpload.ItemSizeText />
            </div>
            <FileUpload.ItemDeleteTrigger>Remove</FileUpload.ItemDeleteTrigger>
          </FileUpload.Item>
        {/each}
      {/snippet}
    </FileUpload.Context>
  </FileUpload.ItemGroup>

  <FileUpload.HiddenInput />
</FileUpload.Root>
