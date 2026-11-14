import { FileUpload } from '@ark-ui/solid/file-upload'
import { FileIcon, PaperclipIcon, XIcon } from 'lucide-solid'
import { For } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/file-upload.module.css'

export const FormUsage = () => {
  return (
    <form
      class="stack"
      onSubmit={(e) => {
        e.preventDefault()
        const files = new FormData(e.currentTarget).getAll('files') as File[]
        window.alert(JSON.stringify({ files: files.map((f) => f.name) }))
      }}
    >
      <FileUpload.Root maxFiles={5} name="files" class={styles.Root}>
        <FileUpload.Label class={styles.Label}>File Upload</FileUpload.Label>
        <FileUpload.Trigger class={styles.Trigger}>
          <PaperclipIcon /> Choose file(s)
        </FileUpload.Trigger>
        <FileUpload.ItemGroup class={styles.ItemGroup}>
          <FileUpload.Context>
            {(context) => (
              <For each={context().acceptedFiles}>
                {(file) => (
                  <FileUpload.Item file={file} class={styles.Item}>
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
                )}
              </For>
            )}
          </FileUpload.Context>
        </FileUpload.ItemGroup>
        <FileUpload.HiddenInput />
      </FileUpload.Root>
      <button class={button.Root} data-variant="solid" type="submit">
        Submit
      </button>
    </form>
  )
}
