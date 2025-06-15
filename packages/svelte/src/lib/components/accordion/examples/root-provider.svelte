<script>
  import { Accordion, useAccordion } from '@ark-ui/svelte/accordion'
  import { ChevronDownIcon } from 'lucide-svelte'

  const id = $props.id()
  const accordion = useAccordion({
    id,
    defaultValue: ['React'],
  })
</script>

<div>
  <div>Open items: {JSON.stringify(accordion().value)}</div>
  <Accordion.RootProvider value={accordion}>
    {#each ['React', 'Solid', 'Vue'] as item (item)}
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
  </Accordion.RootProvider>
</div>
