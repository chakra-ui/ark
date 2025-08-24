<script lang="ts">
  import { Toast, Toaster, createToaster } from '@ark-ui/svelte/toast'
  import { XIcon, LoaderIcon, CircleCheckIcon, CircleAlertIcon } from 'lucide-svelte'

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
        title: 'Uploading...',
        description: 'Please wait while we process your request.',
      },
      success: {
        title: 'Success!',
        description: 'Your request has been processed successfully.',
      },
      error: {
        title: 'Failed',
        description: 'Something went wrong. Please try again.',
      },
    })
  }

  const iconMap = {
    loading: LoaderIcon,
    success: CircleCheckIcon,
    error: CircleAlertIcon,
  }
</script>

<div>
  <button type="button" onclick={handleUpload}>Start Process</button>

  <Toaster {toaster}>
    {#snippet children(toast)}
      {@const icon = toast().type ? iconMap[toast().type as keyof typeof iconMap] : undefined}
      <Toast.Root>
        <div style="display: flex; align-items: flex-start; gap: 12px;">
          {#if icon}
            <svelte:component this={icon} style={toast().type === 'loading' ? 'animation: spin 1s linear infinite;' : ''} />
          {/if}
          <div style="flex: 1;">
            <Toast.Title>{toast().title}</Toast.Title>
            <Toast.Description>{toast().description}</Toast.Description>
          </div>
          <Toast.CloseTrigger>
            <XIcon />
          </Toast.CloseTrigger>
        </div>
      </Toast.Root>
    {/snippet}
  </Toaster>
</div>