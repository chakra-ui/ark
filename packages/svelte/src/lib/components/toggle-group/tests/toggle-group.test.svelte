<script lang="ts">
  import { ToggleGroup } from '@ark-ui/svelte/toggle-group'

  const props: ToggleGroup.RootProps = $props()
</script>

<ToggleGroup.Root {...props} data-testid="root">
  <ToggleGroup.Item value="a">A</ToggleGroup.Item>
  <ToggleGroup.Item value="b">B</ToggleGroup.Item>
  <ToggleGroup.Item value="c">C</ToggleGroup.Item>
</ToggleGroup.Root>
