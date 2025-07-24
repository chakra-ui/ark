<script lang="ts">
  import { FileUpload } from '@ark-ui/svelte/file-upload'
</script>

<FileUpload.Root directory>
  <FileUpload.Trigger>Upload Folder</FileUpload.Trigger>
  <FileUpload.ItemGroup>
    <FileUpload.Context>
      {#snippet render(fileUpload)}
        {#each fileUpload().acceptedFiles as file (file.name)}
          <FileUpload.Item {file}>
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
