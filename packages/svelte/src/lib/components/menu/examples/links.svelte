<script lang="ts">
  import { Menu } from '@ark-ui/svelte/menu'
</script>

<Menu.Root>
  <Menu.Trigger>Open menu</Menu.Trigger>
  <Menu.Positioner>
    <Menu.Content>
      <Menu.Item value="docs">
        {#snippet asChild(itemProps)}
          <a href="https://ark-ui.com" {...itemProps()}>Documentation</a>
        {/snippet}
      </Menu.Item>
      <Menu.Item value="github">
        {#snippet asChild(itemProps)}
          <a href="https://github.com/chakra-ui/ark" {...itemProps()}>GitHub</a>
        {/snippet}
      </Menu.Item>
      <Menu.Item value="twitter">
        {#snippet asChild(itemProps)}
          <a href="https://twitter.com/ark_ui_" {...itemProps()}>Twitter</a>
        {/snippet}
      </Menu.Item>
    </Menu.Content>
  </Menu.Positioner>
</Menu.Root>
