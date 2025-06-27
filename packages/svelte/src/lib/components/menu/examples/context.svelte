<script lang="ts">
  import { Menu } from '@ark-ui/svelte/menu'
</script>

<Menu.Root>
  <Menu.ContextTrigger>Right click me</Menu.ContextTrigger>
  <Menu.Positioner>
    <Menu.Content>
      <Menu.Item value="react">React</Menu.Item>
      <Menu.Item value="solid">Solid</Menu.Item>
      <Menu.Item value="vue">Vue</Menu.Item>
      <Menu.Item value="svelte">Svelte</Menu.Item>
    </Menu.Content>
  </Menu.Positioner>
</Menu.Root>
