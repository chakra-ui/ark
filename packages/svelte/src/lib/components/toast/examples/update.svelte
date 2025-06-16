<script lang="ts">
  import { Toast, Toaster, createToaster } from '@ark-ui/svelte/toast'

  const toaster = createToaster({
    placement: 'bottom-end',
    overlap: true,
    gap: 24,
  })

  let toastId: string | undefined = $state()

  function createToast() {
    toastId = toaster.create({
      title: 'Loading',
      description: 'Loading ...',
      type: 'info',
    })
  }

  function updateToast() {
    if (!toastId) {
      return
    }
    toaster.update(toastId, {
      title: 'Success',
      description: 'Success!',
    })
  }
</script>

<div>
  <button type="button" onclick={createToast}>Create Toast</button>
  <button type="button" onclick={updateToast}>Update Toast</button>
  <Toaster {toaster}>
    {#snippet children(toast)}
      <Toast.Root>
        <Toast.Title>{toast().title}</Toast.Title>
        <Toast.Description>{toast().description}</Toast.Description>
      </Toast.Root>
    {/snippet}
  </Toaster>
</div>
