<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  import { Toast, Toaster, createToaster } from '@ark-ui/svelte/toast'
  import { X } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/toast.module.css'

  const toaster = createToaster({
    overlap: true,
    placement: 'bottom-end',
    gap: 16,
  })

  const durations = [
    { label: '1s', value: 1000 },
    { label: '3s', value: 3000 },
    { label: '5s', value: 5000 },
    { label: '∞', value: Infinity },
  ]
</script>

<div>
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    {#each durations as duration}
      <button
        type="button"
        class={button.Root}
        onclick={() =>
          toaster.create({
            title: `Duration: ${duration.label}`,
            description:
              duration.value === Infinity
                ? 'This toast will stay until you dismiss it.'
                : `This toast will automatically close in ${duration.label}.`,
            type: 'info',
            duration: duration.value,
          })}
      >
        {duration.label}
      </button>
    {/each}
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
