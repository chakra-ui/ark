<script lang="ts">
  import { Menu } from '@ark-ui/svelte/menu'
</script>

<Menu.Root>
  <Menu.Context>
    {#snippet render(menu)}
      <Menu.Trigger>Open menu {menu().open ? '▲' : '▼'}</Menu.Trigger>
    {/snippet}
  </Menu.Context>
  <Menu.Positioner>
    <Menu.Content>
      <Menu.Item value="react">React</Menu.Item>
      <Menu.Item value="solid">Solid</Menu.Item>
      <Menu.Item value="svelte">Svelte</Menu.Item>
      <Menu.Item value="vue">Vue</Menu.Item>
    </Menu.Content>
  </Menu.Positioner>
</Menu.Root>
