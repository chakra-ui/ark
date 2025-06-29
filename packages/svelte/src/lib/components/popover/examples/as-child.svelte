<script lang="ts">
  // @ts-expect-error
  import { Button } from '@acme/ui-lib'
  import { Popover } from '@ark-ui/svelte/popover'
</script>

<Popover.Root>
  <Popover.Trigger>
    {#snippet asChild(props)}
      <Button {...props()}>Open</Button>
    {/snippet}
  </Popover.Trigger>
</Popover.Root>
