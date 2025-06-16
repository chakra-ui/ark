<script lang="ts">
  import { Toast, Toaster, createToaster } from '@ark-ui/svelte/toast'

  const toaster = createToaster({
    placement: 'bottom-end',
    gap: 24,
  })

  function addToast() {
    toaster.create({
      title: 'Toast Title',
      description: 'Toast Description',
      type: 'info',
      action: {
        label: 'Subscribe',
        onClick: () => {
          console.log('Subscribe')
        },
      },
    })
  }
</script>

<div>
  <button type="button" onclick={addToast}>Add Toast</button>
  <Toaster {toaster}>
    {#snippet children(toast)}
      <Toast.Root>
        <Toast.Title>{toast().title}</Toast.Title>
        <Toast.Description>{toast().description}</Toast.Description>
        {#if toast().action}
          <Toast.ActionTrigger>{toast().action?.label}</Toast.ActionTrigger>
        {/if}
      </Toast.Root>
    {/snippet}
  </Toaster>
</div>
