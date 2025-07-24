<script lang="ts">
  import { FileUpload, type FileUploadFileError } from '@ark-ui/svelte/file-upload'

  const errorMessages: Record<FileUploadFileError, string> = {
    TOO_MANY_FILES: '📊 Too many files selected (max 3 allowed)',
    FILE_INVALID_TYPE: '🚫 Invalid file type (only images and PDFs allowed)',
    FILE_TOO_LARGE: '📏 File too large (max 1MB)',
    FILE_TOO_SMALL: '📐 File too small (min 1KB)',
    FILE_INVALID: '⚠️ Invalid file',
    FILE_EXISTS: '🔄 File already exists',
  }
</script>

<FileUpload.Root maxFiles={3} maxFileSize={1024 * 1024} minFileSize={1024} accept="image/*,application/pdf">
  <FileUpload.Label>File Upload with Validation</FileUpload.Label>
  <FileUpload.Trigger>Select Files</FileUpload.Trigger>

  <!-- Accepted Files Section -->
  <div data-status="accepted">
    <h3>✅ Accepted Files</h3>
    <FileUpload.ItemGroup>
      <FileUpload.Context>
        {#snippet render(fileUpload)}
          {#if fileUpload().acceptedFiles.length === 0}
            <div>No files uploaded yet</div>
          {:else}
            {#each fileUpload().acceptedFiles as file (file.name)}
              <FileUpload.Item {file} class="file-item" data-status="accepted">
                <FileUpload.ItemPreview type="image/*">
                  <FileUpload.ItemPreviewImage />
                </FileUpload.ItemPreview>
                <FileUpload.ItemPreview type="application/pdf">
                  <div data-type="pdf">PDF</div>
                </FileUpload.ItemPreview>
                <FileUpload.ItemName />
                <FileUpload.ItemSizeText />
                <FileUpload.ItemDeleteTrigger>Remove</FileUpload.ItemDeleteTrigger>
              </FileUpload.Item>
            {/each}
          {/if}
        {/snippet}
      </FileUpload.Context>
    </FileUpload.ItemGroup>
  </div>

  <!-- Rejected Files Section -->
  <div data-status="rejected">
    <h3>❌ Rejected Files</h3>
    <FileUpload.ItemGroup>
      <FileUpload.Context>
        {#snippet render(fileUpload)}
          {#if fileUpload().rejectedFiles.length === 0}
            <div>No rejected files</div>
          {:else}
            {#each fileUpload().rejectedFiles as fileRejection (fileRejection.file.name)}
              <FileUpload.Item file={fileRejection.file} class="file-item" data-status="rejected">
                <FileUpload.ItemName />
                <FileUpload.ItemSizeText />
                <div>
                  <strong>Validation Errors:</strong>
                  {#each fileRejection.errors as error}
                    <div data-error-code={error}>
                      {errorMessages[error] || `❓ ${error}`}
                    </div>
                  {/each}
                </div>
              </FileUpload.Item>
            {/each}
          {/if}
        {/snippet}
      </FileUpload.Context>
    </FileUpload.ItemGroup>
  </div>

  <FileUpload.HiddenInput />
</FileUpload.Root>
