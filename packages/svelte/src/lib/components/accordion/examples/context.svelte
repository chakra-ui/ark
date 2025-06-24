<script lang="ts">
  import { Accordion } from '@ark-ui/svelte/accordion'
  import { ChevronDownIcon } from 'lucide-svelte'
</script>

<Accordion.Root defaultValue={['React']}>
  <Accordion.Context>
    {#snippet render(context)}
      <div>
        <span>Selected items: {context().value.join(', ')}</span>
        <span>Focused item: {context().focusedValue}</span>
        <button onclick={() => context().setValue(['React', 'Solid'])}>Set value</button>
      </div>
    {/snippet}
  </Accordion.Context>

  {#each ['React', 'Solid', 'Vue', 'Svelte'] as item}
    <Accordion.Item value={item}>
      <Accordion.ItemTrigger>
        What is {item}?
        <Accordion.ItemIndicator>
          <ChevronDownIcon />
        </Accordion.ItemIndicator>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>{item} is a JavaScript library for building user interfaces.</Accordion.ItemContent>
    </Accordion.Item>
  {/each}
</Accordion.Root>
