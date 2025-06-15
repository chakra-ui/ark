<script lang="ts">
  import { Menu } from '@ark-ui/svelte/menu'

  const items = [
    { value: 'react', label: 'React' },
    { value: 'solid', label: 'Solid' },
    { value: 'vue', label: 'Vue' },
  ]

  function handleSelect(e: { value: string }) {
    console.log('[root] selected item', e.value)
  }

  function handleItemSelect(value: string) {
    console.log('[item] selected item', value)
  }
</script>

<Menu.Root onSelect={handleSelect}>
  <Menu.Trigger>
    Open menu <Menu.Indicator>➡️</Menu.Indicator>
  </Menu.Trigger>
  <Menu.Positioner>
    <Menu.Content>
      {#each items as item}
        <Menu.Item value={item.value} onSelect={() => handleItemSelect(item.value)}>
          {item.label}
        </Menu.Item>
      {/each}
    </Menu.Content>
  </Menu.Positioner>
</Menu.Root>
