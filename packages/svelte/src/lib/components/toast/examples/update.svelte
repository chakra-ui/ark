<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  import { Toast, Toaster, createToaster } from '@ark-ui/svelte/toast'
  import { X } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/toast.module.css'

  const toaster = createToaster({
    placement: 'bottom-end',
    overlap: true,
    gap: 16,
  })

  let toastId: string | undefined = $state()

  function createToast() {
    toastId = toaster.create({
      title: 'Uploading file...',
      description: 'Please wait while your file is being uploaded.',
      type: 'loading',
    })
  }

  function updateToast() {
    if (!toastId) {
      return
    }
    toaster.update(toastId, {
      title: 'Upload complete',
      description: 'Your file has been uploaded successfully.',
      type: 'success',
    })
  }
</script>

<div>
  <div style="display: flex; gap: 8px;">
    <button type="button" class={button.Root} onclick={createToast}>Start upload</button>
    <button type="button" class={button.Root} onclick={updateToast}>Complete upload</button>
  </div>
  <Portal>
    <Toaster {toaster}>
      {#snippet children(toast)}
        <Toast.Root class={styles.Root}>
          <Toast.Title class={styles.Title}>{toast().title}</Toast.Title>
          <Toast.Description class={styles.Description}>{toast().description}</Toast.Description>
          <Toast.CloseTrigger class={styles.CloseTrigger}>
            <X />
          </Toast.CloseTrigger>
        </Toast.Root>
      {/snippet}
    </Toaster>
  </Portal>
</div>
