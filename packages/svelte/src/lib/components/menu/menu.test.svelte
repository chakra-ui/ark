<script lang="ts">
  import { Menu, type MenuRootProps } from '@ark-ui/svelte/menu'
  import { Portal } from '@ark-ui/svelte/portal'

  let props: MenuRootProps = $props()
</script>

<Menu.Root {...props}>
  <Menu.Trigger>Open</Menu.Trigger>
  <Portal>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.List>
          <Menu.Item value="new">New</Menu.Item>
          <Menu.Separator />
          <Menu.Item value="exit">Exit</Menu.Item>
        </Menu.List>
      </Menu.Content>
    </Menu.Positioner>
  </Portal>
</Menu.Root>
