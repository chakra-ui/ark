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

  function addToast() {
    toaster.create({
      title: 'Invitation sent',
      description: 'Your team invitation has been sent. Click undo to cancel.',
      type: 'info',
      action: {
        label: 'Undo',
        onClick: () => {
          console.log('Undo clicked')
        },
      },
    })
  }
</script>

<div>
  <button type="button" class={button.Root} onclick={addToast}>Send invitation</button>
  <Portal>
    <Toaster {toaster}>
      {#snippet children(toast)}
        <Toast.Root class={styles.Root}>
          <Toast.Title class={styles.Title}>{toast().title}</Toast.Title>
          <Toast.Description class={styles.Description}>{toast().description}</Toast.Description>
          {#if toast().action}
            <Toast.ActionTrigger class={styles.ActionTrigger}>{toast().action?.label}</Toast.ActionTrigger>
          {/if}
          <Toast.CloseTrigger class={styles.CloseTrigger}>
            <X />
          </Toast.CloseTrigger>
        </Toast.Root>
      {/snippet}
    </Toaster>
  </Portal>
</div>
