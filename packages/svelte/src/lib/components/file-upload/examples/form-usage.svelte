<script lang="ts">
  import { FileUpload } from '@ark-ui/svelte/file-upload'
  import { createForm } from '@tanstack/svelte-form'
  import { FileIcon, PaperclipIcon, XIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/file-upload.module.css'

  const form = createForm(() => ({
    defaultValues: {
      files: [] as File[],
    },
    onSubmit: async ({ value }) => {
      window.alert(JSON.stringify({ files: value.files?.map((f) => f.name) }))
    },
  }))
</script>

<form
  class="stack"
  onsubmit={(e) => {
    e.preventDefault()
    form.handleSubmit()
  }}
>
  <form.Field name="files">
    {#snippet children(field)}
      <FileUpload.Root
        maxFiles={5}
        name={field.name}
        class={styles.Root}
        onFileChange={(details) => field.handleChange(details.acceptedFiles)}
      >
        <FileUpload.Label class={styles.Label}>File Upload</FileUpload.Label>
        <FileUpload.Trigger class={styles.Trigger}>
          <PaperclipIcon /> Choose file(s)
        </FileUpload.Trigger>
        <FileUpload.ItemGroup class={styles.ItemGroup}>
          <FileUpload.Context>
            {#snippet render(context)}
              {#each context().acceptedFiles as file (file.name)}
                <FileUpload.Item {file} class={styles.Item}>
                  <FileUpload.ItemPreview type="image/*" class={styles.ItemPreview}>
                    <FileUpload.ItemPreviewImage class={styles.ItemPreviewImage} />
                  </FileUpload.ItemPreview>
                  <FileUpload.ItemPreview type=".*" class={styles.ItemPreview}>
                    <FileIcon />
                  </FileUpload.ItemPreview>
                  <FileUpload.ItemName class={styles.ItemName} />
                  <FileUpload.ItemSizeText class={styles.ItemSizeText} />
                  <FileUpload.ItemDeleteTrigger class={styles.ItemDeleteTrigger}>
                    <XIcon />
                  </FileUpload.ItemDeleteTrigger>
                </FileUpload.Item>
              {/each}
            {/snippet}
          </FileUpload.Context>
        </FileUpload.ItemGroup>
        <FileUpload.HiddenInput />
      </FileUpload.Root>
    {/snippet}
  </form.Field>
  <button class={button.Root} data-variant="solid" type="submit">Submit</button>
</form>
