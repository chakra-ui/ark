<script>
  import { ToggleGroup } from '@ark-ui/svelte/toggle-group'
</script>

<ToggleGroup.Root>
  <ToggleGroup.Item value="a">A</ToggleGroup.Item>
  <ToggleGroup.Item value="b">B</ToggleGroup.Item>
  <ToggleGroup.Item value="c">C</ToggleGroup.Item>

  <ToggleGroup.Context>
    {#snippet render(api)}
      <div>
        <p>Selected values: {JSON.stringify(api().value)}</p>
      </div>
    {/snippet}
  </ToggleGroup.Context>
</ToggleGroup.Root>
