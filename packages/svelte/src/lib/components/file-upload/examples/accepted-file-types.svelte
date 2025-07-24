<script lang="ts">
  import { FileUpload } from '@ark-ui/svelte/file-upload'
</script>

<FileUpload.Root accept="image/png,image/jpeg">
  <FileUpload.Label>File Upload (PNG and JPEG only)</FileUpload.Label>
  <FileUpload.Dropzone>Drop your files here</FileUpload.Dropzone>
  <FileUpload.Trigger>Select Files</FileUpload.Trigger>
  
  <FileUpload.ItemGroup>
    <FileUpload.Context>
      {#snippet render(context)}
        {#each context().acceptedFiles as file (file.name)}
          <FileUpload.Item {file}>
            <FileUpload.ItemName />
            <FileUpload.ItemSizeText />
            <FileUpload.ItemDeleteTrigger>Remove</FileUpload.ItemDeleteTrigger>
          </FileUpload.Item>
        {/each}
      {/snippet}
    </FileUpload.Context>
  </FileUpload.ItemGroup>

  <FileUpload.ItemGroup>
    <FileUpload.Context>
      {#snippet render(context)}
        {#each context().rejectedFiles as fileRejection (fileRejection.file.name)}
          <FileUpload.Item file={fileRejection.file}>
            <FileUpload.ItemName />
            <FileUpload.ItemSizeText />
            <div>
              {#each fileRejection.errors as error}
                <div style="color: red;">
                  {error}
                </div>
              {/each}
            </div>
          </FileUpload.Item>
        {/each}
      {/snippet}
    </FileUpload.Context>
  </FileUpload.ItemGroup>

  <FileUpload.HiddenInput />
</FileUpload.Root>
