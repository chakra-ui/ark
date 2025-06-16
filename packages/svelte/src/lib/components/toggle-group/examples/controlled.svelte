<script>
  import { ToggleGroup } from '@ark-ui/svelte/toggle-group'

  let value = $state(['b'])
</script>

<div>Value is {JSON.stringify(value)}</div>

<ToggleGroup.Root bind:value>
  <ToggleGroup.Item value="a">A</ToggleGroup.Item>
  <ToggleGroup.Item value="b">B</ToggleGroup.Item>
  <ToggleGroup.Item value="c">C</ToggleGroup.Item>
</ToggleGroup.Root>
