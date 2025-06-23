<script lang="ts">
  import { Accordion } from '@ark-ui/svelte/accordion'
  import { ChevronDownIcon } from 'lucide-svelte'
</script>

<Accordion.Root defaultValue={['React']}>
  {#each ['React', 'Solid', 'Vue'] as item}
    <Accordion.Item value={item}>
      <Accordion.ItemTrigger>
        What is {item}?
        <Accordion.ItemIndicator>
          <ChevronDownIcon />
        </Accordion.ItemIndicator>
        <Accordion.ItemContext>
          {#snippet render(context)}
            <div style="display: inline-flex; gap: 0.5rem;">
              <span>Expanded: {context().expanded}</span>
              <span>Focused: {context().focused}</span>
              <span>Disabled: {context().disabled}</span>
            </div>
          {/snippet}
        </Accordion.ItemContext>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>{item} is a JavaScript library for building user interfaces.</Accordion.ItemContent>
    </Accordion.Item>
  {/each}
</Accordion.Root>
