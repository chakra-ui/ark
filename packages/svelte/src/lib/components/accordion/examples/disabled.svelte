<script>
  import { Accordion } from '@ark-ui/svelte/accordion'

  const items = ['panel-1', 'panel-2', 'panel-3']
</script>

<Accordion.Root>
  {#each items as item (item)}
    <Accordion.Item value={item} disabled={item === 'panel-2'}>
      <Accordion.ItemTrigger>
        {item} trigger
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        {item} content
      </Accordion.ItemContent>
    </Accordion.Item>
  {/each}
</Accordion.Root>
