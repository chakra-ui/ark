<script lang="ts">
  import { Dialog } from '../index.ts'

  let triggerValue = $state<string | null>(null)
</script>

<Dialog.Root bind:triggerValue>
  <Dialog.Trigger value="first">First</Dialog.Trigger>
  <Dialog.Trigger value="second">Second</Dialog.Trigger>
  <Dialog.Positioner>
    <Dialog.Content>Content</Dialog.Content>
  </Dialog.Positioner>
</Dialog.Root>
<output data-testid="trigger">{String(triggerValue)}</output>
