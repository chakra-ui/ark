<script lang="ts">
  import { Menu } from '@ark-ui/svelte/menu'

  let checked = $state(false)
</script>

<Menu.Root>
  <Menu.Trigger>Open menu</Menu.Trigger>
  <Menu.Positioner>
    <Menu.Content>
      <Menu.CheckboxItem bind:checked value="checked">
        <Menu.ItemIndicator>✅</Menu.ItemIndicator>
        <Menu.ItemText>Check me</Menu.ItemText>
      </Menu.CheckboxItem>
    </Menu.Content>
  </Menu.Positioner>
</Menu.Root>
