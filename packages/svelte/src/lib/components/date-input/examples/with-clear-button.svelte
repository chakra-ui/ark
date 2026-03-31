<script lang="ts">
  import { DateInput, useDateInput } from '@ark-ui/svelte/date-input'
  import button from 'styles/button.module.css'
  import styles from 'styles/date-input.module.css'

  const id = $props.id()
  const dateInput = useDateInput({ id })
</script>

<DateInput.RootProvider value={dateInput} class={styles.Root}>
  <DateInput.Label class={styles.Label}>Date</DateInput.Label>
  <DateInput.Control class={styles.Control}>
    <DateInput.SegmentGroup class={styles.Input}>
      <DateInput.Context>
        {#snippet render(dateInput)}
          {#each dateInput().getSegments() as segment}
            <DateInput.Segment class={styles.Segment} {segment} />
          {/each}
        {/snippet}
      </DateInput.Context>
    </DateInput.SegmentGroup>
    <button class={button.Root} type="button" onclick={() => dateInput().clearValue()}>Clear</button>
  </DateInput.Control>
  <DateInput.HiddenInput />
</DateInput.RootProvider>
