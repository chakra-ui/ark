import { FileUpload } from '@ark-ui/solid/file-upload'
import { createForm, setValue } from '@modular-forms/solid'
import { FileIcon, PaperclipIcon, XIcon } from 'lucide-solid'
import { For } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/file-upload.module.css'

export const FormUsage = () => {
  const [formStore, { Form, Field }] = createForm<{ files: File[] }>()

  return (
    <Form
      class="stack"
      onSubmit={(data) => {
        window.alert(JSON.stringify({ files: data.files?.map((f) => f.name) }))
      }}
    >
      <Field name="files" type="File[]">
        {(field) => (
          <FileUpload.Root
            maxFiles={5}
            name={field.name}
            class={styles.Root}
            onFileChange={(details) => setValue(formStore, 'files', details.acceptedFiles)}
          >
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
        )}
      </Field>
      <button class={button.Root} data-variant="solid" type="submit">
        Submit
      </button>
    </Form>
  )
}
