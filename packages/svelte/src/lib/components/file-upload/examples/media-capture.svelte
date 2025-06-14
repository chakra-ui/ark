<script lang="ts">
  import { FileUpload } from '@ark-ui/svelte/file-upload'
</script>

<FileUpload.Root capture="environment">
  <FileUpload.Trigger>Open Camera</FileUpload.Trigger>
  <FileUpload.ItemGroup>
    <FileUpload.Context>
      {#snippet render(context)}
        {#each context().acceptedFiles as file (file.name)}
          <FileUpload.Item {file}>
            <FileUpload.ItemPreview type="image/*">
              <FileUpload.ItemPreviewImage />
            </FileUpload.ItemPreview>
            <FileUpload.ItemName>
              {file.webkitRelativePath ?? file.name}
            </FileUpload.ItemName>
          </FileUpload.Item>
        {/each}
      {/snippet}
    </FileUpload.Context>
  </FileUpload.ItemGroup>
  <FileUpload.HiddenInput />
</FileUpload.Root>
