<script lang="ts">
  import { FileUpload } from '@ark-ui/svelte/file-upload'
  import { FileIcon } from 'lucide-svelte'
</script>

<FileUpload.Root maxFileSize={1024 * 1024} minFileSize={1024}>
  <FileUpload.Label>File Upload (1KB - 1MB)</FileUpload.Label>
  <FileUpload.Dropzone>Drop files here (1KB - 1MB)</FileUpload.Dropzone>
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

  <!-- Show rejected files -->
  <FileUpload.Context>
    {#snippet render(context)}
      {#if context().rejectedFiles.length > 0}
        <div style="color: red; margin-top: 1rem;">
          <h4>Rejected Files:</h4>
          {#each context().rejectedFiles as rejectedFile}
            <p>{rejectedFile.file.name} ({rejectedFile.file.size} bytes) - {rejectedFile.errors.join(', ')}</p>
          {/each}
        </div>
      {/if}
    {/snippet}
  </FileUpload.Context>

  <FileUpload.HiddenInput />
</FileUpload.Root>
