<script>
  import { Accordion } from '@ark-ui/svelte/accordion'
  import { ChevronRightIcon } from 'lucide-svelte'
</script>

<div style="display: flex; max-width: 900px;">
  <Accordion.Root defaultValue={['React']} orientation="horizontal">
    {#each ['React', 'Solid', 'Vue'] as item (item)}
      <Accordion.Item value={item} style="display: flex; flex-direction: column;">
        <Accordion.ItemTrigger style="min-height: 2rem; writing-mode: vertical-lr;">
          What is {item}?
          <Accordion.ItemIndicator>
            <ChevronRightIcon />
          </Accordion.ItemIndicator>
        </Accordion.ItemTrigger>
        <Accordion.ItemContent style="max-width: 200px;">
          {item} is a JavaScript library for building user interfaces.
        </Accordion.ItemContent>
      </Accordion.Item>
    {/each}
  </Accordion.Root>
</div>
