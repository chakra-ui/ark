<script lang="ts">
  import { Menu } from '@ark-ui/svelte/menu'

  let value = $state('React')

  const frameworks = ['React', 'Solid', 'Vue', 'Svelte']
</script>

<Menu.Root>
  <Menu.Trigger>Open menu</Menu.Trigger>
  <Menu.Positioner>
    <Menu.Content>
      <Menu.RadioItemGroup bind:value>
        <Menu.ItemGroupLabel>JS Frameworks</Menu.ItemGroupLabel>
        {#each frameworks as framework (framework)}
          <Menu.RadioItem value={framework}>
            <Menu.ItemIndicator>✅</Menu.ItemIndicator>
            <Menu.ItemText>{framework}</Menu.ItemText>
          </Menu.RadioItem>
        {/each}
      </Menu.RadioItemGroup>
    </Menu.Content>
  </Menu.Positioner>
</Menu.Root>
