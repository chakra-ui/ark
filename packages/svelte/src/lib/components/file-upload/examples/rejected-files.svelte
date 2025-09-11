<script lang="ts">
  import { XIcon } from 'lucide-svelte'
  import { FileUpload } from '@ark-ui/svelte'
</script>

<FileUpload.Root maxFiles={2} onFileReject={(fileRejection) => console.log(fileRejection)}>
  <FileUpload.Dropzone>Drag and drop your images here</FileUpload.Dropzone>

  <!-- Accepted Files -->
  <FileUpload.ItemGroup type="accepted">
    <h3>Accepted Files</h3>
    <FileUpload.Context>
      {#snippet render(context)}
        {#each context().acceptedFiles as file (file.name)}
          <FileUpload.Item {file}>
            <FileUpload.ItemPreview type="image/*">
              <FileUpload.ItemPreviewImage />
            </FileUpload.ItemPreview>
            <FileUpload.ItemName />
            <FileUpload.ItemDeleteTrigger>
              <XIcon />
            </FileUpload.ItemDeleteTrigger>
          </FileUpload.Item>
        {/each}
      {/snippet}
    </FileUpload.Context>
  </FileUpload.ItemGroup>

  <!-- Rejected Files -->
  <FileUpload.ItemGroup type="rejected">
    <h3>Rejected Files</h3>
    <FileUpload.Context>
      {#snippet render(context)}
        {#each context().rejectedFiles as { file, errors } (file.name)}
          <FileUpload.Item {file}>
            <FileUpload.ItemName />
            {errors.join(', ')}
            <FileUpload.ItemSizeText />
            <FileUpload.ItemDeleteTrigger>
              <XIcon />
            </FileUpload.ItemDeleteTrigger>
          </FileUpload.Item>
        {/each}
      {/snippet}
    </FileUpload.Context>
  </FileUpload.ItemGroup>

  <FileUpload.HiddenInput />
</FileUpload.Root>
