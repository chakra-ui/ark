<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  import { Toast, Toaster, createToaster } from '@ark-ui/svelte/toast'
  import { X, LoaderIcon, CircleCheckIcon, CircleAlertIcon, InfoIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/toast.module.css'

  const toaster = createToaster({
    overlap: true,
    placement: 'bottom-end',
    gap: 16,
  })

  const uploadFile = () => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve() : reject(new Error('Upload failed'))
      }, 2000)
    })
  }

  const handleUpload = async () => {
    toaster.promise(uploadFile, {
      loading: {
        title: 'Uploading file...',
        description: 'Please wait while we process your file.',
      },
      success: {
        title: 'Upload complete',
        description: 'Your file has been uploaded successfully.',
      },
      error: {
        title: 'Upload failed',
        description: 'There was an error uploading your file. Please try again.',
      },
    })
  }

  const iconMap = {
    loading: LoaderIcon,
    success: CircleCheckIcon,
    error: CircleAlertIcon,
    info: InfoIcon,
  }
</script>

<div>
  <button type="button" class={button.Root} onclick={handleUpload}>Upload file</button>

  <Portal>
    <Toaster {toaster}>
      {#snippet children(toast)}
        {@const icon = toast().type ? iconMap[toast().type as keyof typeof iconMap] : InfoIcon}
        <Toast.Root class={styles.Root}>
          <Toast.Title class={styles.Title}>
            <svelte:component
              this={icon}
              class={styles.Indicator}
              style={toast().type === 'loading' ? 'animation: spin 1s linear infinite;' : ''}
            />
            {toast().title}
          </Toast.Title>
          <Toast.Description class={styles.Description}>{toast().description}</Toast.Description>
          <Toast.CloseTrigger class={styles.CloseTrigger}>
            <X />
          </Toast.CloseTrigger>
        </Toast.Root>
      {/snippet}
    </Toaster>
  </Portal>
</div>
