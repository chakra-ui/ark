<script>
  import { Steps } from '@ark-ui/svelte/steps'

  const items = [
    { value: 'first', title: 'First', description: 'Contact Info' },
    { value: 'second', title: 'Second', description: 'Date & Time' },
    { value: 'third', title: 'Third', description: 'Select Rooms' },
  ]
</script>

<Steps.Root count={items.length}>
  <Steps.List>
    {#each items as item, index}
      <Steps.Item {index}>
        <Steps.Trigger>
          <Steps.Indicator>{index + 1}</Steps.Indicator>
          <span>{item.title}</span>
        </Steps.Trigger>
        <Steps.Separator />
      </Steps.Item>
    {/each}
  </Steps.List>

  {#each items as item, index}
    <Steps.Content {index}>
      {item.title} - {item.description}
    </Steps.Content>
  {/each}

  <Steps.CompletedContent>Steps Complete - Thank you for filling out the form!</Steps.CompletedContent>

  <div>
    <Steps.PrevTrigger>Back</Steps.PrevTrigger>
    <Steps.NextTrigger>Next</Steps.NextTrigger>
  </div>
</Steps.Root>
