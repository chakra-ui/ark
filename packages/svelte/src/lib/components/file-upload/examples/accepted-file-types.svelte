<script lang="ts">
  import { FileUpload } from '@ark-ui/svelte/file-upload'
</script>

<FileUpload.Root accept="image/png">
  <FileUpload.Trigger>Select PNG Files Only</FileUpload.Trigger>
  <FileUpload.ItemGroup>
    <FileUpload.Context>
      {#snippet render(context)}
        {#each context().acceptedFiles as file (file.name)}
          <FileUpload.Item {file}>
            <FileUpload.ItemName />
          </FileUpload.Item>
        {/each}
      {/snippet}
    </FileUpload.Context>
  </FileUpload.ItemGroup>
  <FileUpload.HiddenInput />
</FileUpload.Root>
