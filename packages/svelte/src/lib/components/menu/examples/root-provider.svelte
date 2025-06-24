<script lang="ts">
  import { Menu, useMenu } from '@ark-ui/svelte/menu'

  const menu = useMenu()
</script>

<div>Menu is {menu().api.open ? 'open' : 'closed'}</div>

<Menu.RootProvider value={menu}>
  <Menu.Trigger>Open menu</Menu.Trigger>
  <Menu.Positioner>
    <Menu.Content>
      <Menu.Item value="react">React</Menu.Item>
      <Menu.Item value="solid">Solid</Menu.Item>
      <Menu.Item value="vue">Vue</Menu.Item>
      <Menu.Item value="svelte">Svelte</Menu.Item>
    </Menu.Content>
  </Menu.Positioner>
</Menu.RootProvider>
