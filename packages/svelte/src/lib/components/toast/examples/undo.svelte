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

  let files = $state([
    { id: 'report', name: 'Q4 report.pdf' },
    { id: 'notes', name: 'Meeting notes.md' },
    { id: 'budget', name: 'Budget.xlsx' },
  ])

  function archive(id: string) {
    const item = files.find((file) => file.id === id)
    if (!item) return

    files = files.filter((file) => file.id !== id)
    toaster.create({
      title: 'File archived',
      description: item.name,
      type: 'info',
      action: {
        label: 'Undo',
        onClick: () => {
          if (!files.some((file) => file.id === item.id)) {
            files = [item, ...files]
          }
        },
      },
    })
  }
</script>

<div class="stack">
  {#each files as file (file.id)}
    <div class="hstack">
      <span>{file.name}</span>
      <button type="button" class={button.Root} onclick={() => archive(file.id)}>Archive</button>
    </div>
  {/each}
  {#if files.length === 0}
    <p>No files</p>
  {/if}
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
