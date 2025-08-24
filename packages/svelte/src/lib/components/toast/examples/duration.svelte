<script lang="ts">
  import { Toast, Toaster, createToaster } from '@ark-ui/svelte/toast'
  import { XIcon, ClockIcon } from 'lucide-svelte'

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
        onclick={() =>
          toaster.create({
            title: `Toast (${duration.label})`,
            description: `This toast will ${
              duration.value === Infinity
                ? 'stay until dismissed'
                : `disappear in ${duration.label}`
            }.`,
            type: 'info',
            duration: duration.value,
          })}
      >
        {duration.label}
      </button>
    {/each}
  </div>

  <Toaster {toaster}>
    {#snippet children(toast)}
      <Toast.Root>
        <div style="display: flex; align-items: flex-start; gap: 12px;">
          <ClockIcon />
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