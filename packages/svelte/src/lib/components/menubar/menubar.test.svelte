<script lang="ts">
  import { Menu } from '@ark-ui/svelte/menu'
  import { Menubar, type MenubarRootProps } from '@ark-ui/svelte/menubar'
  import { Portal } from '@ark-ui/svelte/portal'

  let props: MenubarRootProps = $props()
</script>

<Menubar.Root {...props}>
  <Menu.Root>
    <Menu.Trigger>File</Menu.Trigger>
    <Portal>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item value="new">New File</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>

  <Menu.Root>
    <Menu.Trigger>Edit</Menu.Trigger>
    <Portal>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item value="undo">Undo</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>

  <Menu.Root>
    <Menu.Trigger>View</Menu.Trigger>
    <Portal>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item value="zoom-in">Zoom In</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>
</Menubar.Root>
