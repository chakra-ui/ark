<script lang="ts">
  import { ToggleGroup } from '@ark-ui/svelte/toggle-group'

  let value = $state<string[]>(['a'])
</script>

<button type="button" onclick={() => (value = ['c'])}>select c</button>
<ToggleGroup.Root bind:value>
  <ToggleGroup.Item value="a">A</ToggleGroup.Item>
  <ToggleGroup.Item value="b">B</ToggleGroup.Item>
  <ToggleGroup.Item value="c">C</ToggleGroup.Item>
</ToggleGroup.Root>
<output data-testid="value">{value.join(',')}</output>
