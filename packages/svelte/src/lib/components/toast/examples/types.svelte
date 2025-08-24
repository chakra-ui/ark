<script lang="ts">
  import { Toast, Toaster, createToaster } from '@ark-ui/svelte/toast'
  import { CircleAlertIcon, TriangleAlertIcon, CircleCheckIcon, InfoIcon, X } from 'lucide-svelte'

  const toaster = createToaster({
    overlap: true,
    placement: 'bottom-end',
    gap: 16,
  })

  const iconMap = {
    success: CircleCheckIcon,
    error: CircleAlertIcon,
    warning: TriangleAlertIcon,
    info: InfoIcon,
  }
</script>

<div>
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <button
      type="button"
      onclick={() => toaster.success({ title: 'Success!', description: 'Your changes have been saved.' })}
    >
      Success
    </button>
    <button
      type="button"
      onclick={() => toaster.error({ title: 'Error occurred', description: 'Something went wrong. Please try again.' })}
    >
      Error
    </button>
    <button
      type="button"
      onclick={() => toaster.warning({ title: 'Warning', description: 'This action cannot be undone.' })}
    >
      Warning
    </button>
    <button
      type="button"
      onclick={() =>
        toaster.info({ title: 'New update available', description: 'Version 2.1.0 is now available for download.' })}
    >
      Info
    </button>
  </div>

  <Toaster {toaster}>
    {#snippet children(toast)}
      {@const icon = toast().type ? iconMap[toast().type as keyof typeof iconMap] : InfoIcon}
      <Toast.Root>
        <div style="display: flex; align-items: flex-start; gap: 12px;">
          <svelte:component this={icon} />
          <div style="flex: 1;">
            <Toast.Title>{toast().title}</Toast.Title>
            <Toast.Description>{toast().description}</Toast.Description>
          </div>
          <Toast.CloseTrigger>
            <X />
          </Toast.CloseTrigger>
        </div>
      </Toast.Root>
    {/snippet}
  </Toaster>
</div>
