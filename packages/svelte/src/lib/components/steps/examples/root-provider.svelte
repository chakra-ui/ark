<script>
  import { Steps, useSteps } from '@ark-ui/svelte/steps'

  const items = [
    { value: 'first', title: 'First', description: 'Contact Info' },
    { value: 'second', title: 'Second', description: 'Date & Time' },
    { value: 'third', title: 'Third', description: 'Select Rooms' },
  ]

  const id = $props.id()
  const steps = useSteps({
    id,
    count: items.length,
    defaultStep: 0,
  })
</script>

<div>
  <div>Current step: {steps().value}</div>
  <Steps.RootProvider value={steps}>
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

    <Steps.Progress />

    {#each items as item, index}
      <Steps.Content {index}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </Steps.Content>
    {/each}

    <Steps.CompletedContent>
      <h3>Complete!</h3>
      <p>Thank you for filling out the form!</p>
    </Steps.CompletedContent>

    <div>
      <Steps.PrevTrigger>Back</Steps.PrevTrigger>
      <Steps.NextTrigger>Next</Steps.NextTrigger>
    </div>
  </Steps.RootProvider>
</div>
