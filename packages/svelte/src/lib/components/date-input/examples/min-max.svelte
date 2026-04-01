<script lang="ts">
  import { DateInput } from '@ark-ui/svelte/date-input'
  import { parseDate } from '@internationalized/date'
  import styles from 'styles/date-input.module.css'
</script>

<DateInput.Root class={styles.Root} min={parseDate('2024-01-01')} max={parseDate('2024-12-31')}>
  <DateInput.Label class={styles.Label}>Date (2024 only)</DateInput.Label>
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
</DateInput.Root>
