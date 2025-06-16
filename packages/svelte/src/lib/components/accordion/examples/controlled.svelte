<script>
  import { Accordion } from '@ark-ui/svelte/accordion'
  import { ChevronDownIcon } from 'lucide-svelte'

  let value = $state(['React'])
</script>

<div>
  <div>Value: {JSON.stringify(value)}</div>
  <Accordion.Root bind:value>
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
  </Accordion.Root>
</div>
