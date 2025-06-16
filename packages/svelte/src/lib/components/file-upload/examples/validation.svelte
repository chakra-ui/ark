<script lang="ts">
  import { FileUpload } from '@ark-ui/svelte/file-upload'
  import { FileIcon } from 'lucide-svelte'

  function validateFile(file: File) {
    if (file.name.length > 20) return ['FILE_NAME_TOO_LONG']
    return null
  }
</script>

<FileUpload.Root validate={validateFile}>
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
            <p>{rejectedFile.file.name} - {rejectedFile.errors[0]}</p>
          {/each}
        </div>
      {/if}
    {/snippet}
  </FileUpload.Context>

  <FileUpload.HiddenInput />
</FileUpload.Root>
