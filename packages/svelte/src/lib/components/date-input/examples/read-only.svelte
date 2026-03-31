<script lang="ts">
  import { DateInput } from '@ark-ui/svelte/date-input'
  import { parseDate } from '@internationalized/date'
  import styles from 'styles/date-input.module.css'
</script>

<DateInput.Root class={styles.Root} readOnly defaultValue={[parseDate('2024-06-15')]}>
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
  </DateInput.Control>
  <DateInput.HiddenInput />
</DateInput.Root>
