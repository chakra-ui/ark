<script lang="ts">
  import { FileUpload } from '@ark-ui/svelte/file-upload'
  import { compressAccurately } from 'image-conversion'

  const transformFiles = async (files: File[]) => {
    return Promise.all(
      files.map(async (file) => {
        if (file.type.startsWith('image/')) {
          try {
            const blob = await compressAccurately(file, 200)
            return new File([blob], file.name, { type: blob.type })
          } catch (error) {
            console.error('Compression failed for:', file.name, error)
            return file
          }
        }
        return file
      }),
    )
  }
</script>

<FileUpload.Root accept="image/*" maxFiles={5} {transformFiles}>
  <FileUpload.Label>File Upload with Compression</FileUpload.Label>
  <FileUpload.Trigger>Choose Images</FileUpload.Trigger>

  <FileUpload.ItemGroup>
    <FileUpload.Context>
      {#snippet render(fileUpload)}
        {#each fileUpload().acceptedFiles as file (file.name)}
          <FileUpload.Item {file} class="file-item">
            <FileUpload.ItemPreview type="image/*">
              <FileUpload.ItemPreviewImage />
            </FileUpload.ItemPreview>
            <FileUpload.ItemName />
            <FileUpload.ItemSizeText />
            <FileUpload.ItemDeleteTrigger>Remove</FileUpload.ItemDeleteTrigger>
          </FileUpload.Item>
        {/each}
      {/snippet}
    </FileUpload.Context>
  </FileUpload.ItemGroup>

  <FileUpload.HiddenInput />
</FileUpload.Root>
