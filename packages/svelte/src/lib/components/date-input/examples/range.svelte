<script lang="ts">
  import { DateInput } from '@ark-ui/svelte/date-input'
  import styles from 'styles/date-input.module.css'
</script>

<DateInput.Root class={styles.Root} selectionMode="range">
  <DateInput.Label class={styles.Label}>Date Range</DateInput.Label>
  <DateInput.Control class={styles.Control}>
    <DateInput.SegmentGroup index={0} class={styles.Input}>
      <DateInput.Context>
        {#snippet render(dateInput)}
          {#each dateInput().getSegments() as segment}
            <DateInput.Segment class={styles.Segment} {segment} />
          {/each}
        {/snippet}
      </DateInput.Context>
    </DateInput.SegmentGroup>
    <span>→</span>
    <DateInput.SegmentGroup index={1} class={styles.Input}>
      <DateInput.Context>
        {#snippet render(dateInput)}
          {#each dateInput().getSegments() as segment}
            <DateInput.Segment class={styles.Segment} {segment} />
          {/each}
        {/snippet}
      </DateInput.Context>
    </DateInput.SegmentGroup>
  </DateInput.Control>
  <DateInput.HiddenInput index={0} />
  <DateInput.HiddenInput index={1} />
</DateInput.Root>
