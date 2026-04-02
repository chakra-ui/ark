<script lang="ts">
  import { DateInput } from '@ark-ui/svelte/date-input'
  import styles from 'styles/date-input.module.css'
</script>

<DateInput.Root class={styles.Root} granularity="second">
  <DateInput.Label class={styles.Label}>Date & Time</DateInput.Label>
  <DateInput.Control class={styles.Control}>
    <DateInput.SegmentGroup class={styles.SegmentGroup}>
      <DateInput.SegmentContext>
        {#snippet render(segment)}
          <DateInput.Segment class={styles.Segment} {segment} />
        {/snippet}
      </DateInput.SegmentContext>
    </DateInput.SegmentGroup>
  </DateInput.Control>
  <DateInput.HiddenInput />
</DateInput.Root>
