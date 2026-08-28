<script lang="ts">
  import { DateInput } from '@ark-ui/svelte/date-input'
  import { parseZonedDateTime } from '@internationalized/date'
  import styles from 'styles/date-input.module.css'

  let hideTimeZone = $state(false)
</script>

<div class="stack">
  <label class={styles.CheckboxLabel}>
    <input class={styles.Checkbox} bind:checked={hideTimeZone} type="checkbox" />
    Hide time zone
  </label>
  <DateInput.Root
    class={styles.Root}
    defaultValue={[parseZonedDateTime('2025-02-03T08:45:00[America/Los_Angeles]')]}
    granularity="minute"
    {hideTimeZone}
  >
    <DateInput.Label class={styles.Label}>Meeting time</DateInput.Label>
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
</div>
