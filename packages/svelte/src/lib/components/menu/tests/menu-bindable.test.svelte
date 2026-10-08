<script lang="ts">
  import { Menu } from '../index.ts'

  let highlightedValue = $state<string | null>(null)
  let triggerValue = $state<string | null>(null)
</script>

<Menu.Root bind:highlightedValue bind:triggerValue>
  <Menu.Trigger value="first">First</Menu.Trigger>
  <Menu.Trigger value="second">Second</Menu.Trigger>
  <Menu.Positioner>
    <Menu.Content>
      <Menu.Item value="edit">Edit</Menu.Item>
      <Menu.Item value="delete">Delete</Menu.Item>
    </Menu.Content>
  </Menu.Positioner>
</Menu.Root>
<output data-testid="highlighted">{String(highlightedValue)}</output>
<output data-testid="trigger">{String(triggerValue)}</output>
