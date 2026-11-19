<script lang="ts">
  import { RadioGroup } from '@ark-ui/svelte/radio-group'

  let value = $state<string | null>('react')
</script>

<button type="button" onclick={() => (value = 'vue')}>select vue</button>
<RadioGroup.Root bind:value>
  <RadioGroup.Label>Framework</RadioGroup.Label>
  {#each ['react', 'solid', 'vue'] as item (item)}
    <RadioGroup.Item value={item}>
      <RadioGroup.ItemText>{item}</RadioGroup.ItemText>
      <RadioGroup.ItemControl />
      <RadioGroup.ItemHiddenInput />
    </RadioGroup.Item>
  {/each}
</RadioGroup.Root>
<output data-testid="value">{String(value)}</output>
