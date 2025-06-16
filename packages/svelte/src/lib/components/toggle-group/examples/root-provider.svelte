<script>
  import { ToggleGroup, useToggleGroup } from '@ark-ui/svelte/toggle-group'

  const id = $props.id()
  const toggleGroup = useToggleGroup({ id })
</script>

<button onclick={() => toggleGroup().setValue(['b'])}>Set to B</button>

<ToggleGroup.RootProvider value={toggleGroup}>
  <ToggleGroup.Item value="a">A</ToggleGroup.Item>
  <ToggleGroup.Item value="b">B</ToggleGroup.Item>
  <ToggleGroup.Item value="c">C</ToggleGroup.Item>
</ToggleGroup.RootProvider>
