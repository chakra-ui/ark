<script lang="ts">
  import { DateInput, useDateInput } from '@ark-ui/svelte/date-input'
  import styles from 'styles/date-input.module.css'

  const id = $props.id()
  const dateInput = useDateInput({ id })
</script>

<DateInput.RootProvider value={dateInput} class={styles.Root}>
  <output>{dateInput().valueAsString.length > 0 ? dateInput().valueAsString : 'N/A'}</output>
  <DateInput.Label class={styles.Label}>Date</DateInput.Label>
  <DateInput.Control class={styles.Control}>
    <DateInput.SegmentGroup class={styles.SegmentGroup}>
      <DateInput.Context>
        {#snippet render(dateInput)}
          {#each dateInput().getSegments() as segment}
            <DateInput.Segment class={styles.Segment} {segment} />
          {/each}
        {/snippet}
      </DateInput.Context>
    </DateInput.SegmentGroup>
  </DateInput.Control>
  <DateInput.HiddenInput />
</DateInput.RootProvider>
