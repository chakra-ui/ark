<script>
  import { Accordion } from '@ark-ui/svelte/accordion'
  import { ChevronDownIcon } from 'lucide-svelte'

  const items = ['React', 'Solid', 'Vue', 'Svelte']
</script>

<Accordion.Root defaultValue={['React']}>
  {#each items as item (item)}
    <Accordion.Item value={item}>
      <Accordion.ItemTrigger>
        What is {item}?
        <Accordion.ItemIndicator>
          <ChevronDownIcon />
        </Accordion.ItemIndicator>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        {item} is a JavaScript library for building user interfaces.
      </Accordion.ItemContent>
    </Accordion.Item>
  {/each}
</Accordion.Root>
