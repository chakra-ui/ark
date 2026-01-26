<script lang="ts">
  import { Steps } from '@ark-ui/svelte/steps'
  import button from 'styles/button.module.css'
  import styles from 'styles/steps.module.css'

  const items = [
    { value: 'first', title: 'First', description: 'Contact Info' },
    { value: 'second', title: 'Second', description: 'Date & Time' },
    { value: 'third', title: 'Third', description: 'Select Rooms' },
  ]

  let step = $state(0)
</script>

<div class="stack">
  <output>current step: {step + 1}</output>

  <Steps.Root class={styles.Root} bind:step count={items.length}>
    <Steps.List class={styles.List}>
      {#each items as item, index}
        <Steps.Item class={styles.Item} {index}>
          <Steps.Trigger class={styles.Trigger}>
            <Steps.Indicator class={styles.Indicator}>{index + 1}</Steps.Indicator>
            <span>{item.title}</span>
          </Steps.Trigger>
          <Steps.Separator class={styles.Separator} />
        </Steps.Item>
      {/each}
    </Steps.List>

    {#each items as item, index}
      <Steps.Content class={styles.Content} {index}>
        {item.title} - {item.description}
      </Steps.Content>
    {/each}

    <Steps.CompletedContent class={styles.CompletedContent}>
      Steps Complete - Thank you for filling out the form!
    </Steps.CompletedContent>

    <div class={styles.Actions}>
      <Steps.PrevTrigger class={button.Root}>Back</Steps.PrevTrigger>
      <Steps.NextTrigger class={button.Root} data-variant="solid">Next</Steps.NextTrigger>
    </div>
  </Steps.Root>
</div>
