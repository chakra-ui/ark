<script lang="ts">
  import { DateInput } from '@ark-ui/svelte/date-input'
  import { parseDate } from '@internationalized/date'
  import styles from 'styles/date-input.module.css'

  let shouldForceLeadingZeros = $state(true)
</script>

<div class="stack">
  <label class={styles.CheckboxLabel}>
    <input class={styles.Checkbox} bind:checked={shouldForceLeadingZeros} type="checkbox" />
    Force leading zeros
  </label>
  <DateInput.Root
    class={styles.Root}
    defaultValue={[parseDate('2024-06-05')]}
    shouldForceLeadingZeros={shouldForceLeadingZeros}
  >
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
  </DateInput.Root>
</div>
