<script lang="ts">
  import { Accordion } from '@ark-ui/svelte/accordion'

  const items = ['React', 'Solid', 'Vue', 'Svelte']
</script>

<Accordion.Root>
  {#each items as item (item)}
    <Accordion.Item value={item}>
      <Accordion.ItemContext>
        {#snippet render(context)}
          <Accordion.ItemTrigger>{context().expanded ? 'Expanded' : 'Closed'}</Accordion.ItemTrigger>
          <Accordion.ItemContent>{item} content</Accordion.ItemContent>
        {/snippet}
      </Accordion.ItemContext>
    </Accordion.Item>
  {/each}
</Accordion.Root>
