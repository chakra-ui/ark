<script lang="ts">
  import { DateInput } from '@ark-ui/svelte/date-input'
  import styles from 'styles/date-input.module.css'
</script>

<DateInput.Root class={styles.Root} dir="rtl" locale="ar-SA">
  <DateInput.Label class={styles.Label}>التاريخ</DateInput.Label>
  <DateInput.Control class={styles.Control}>
    <DateInput.SegmentGroup class={styles.Input}>
      <DateInput.Context>
        {#snippet render(dateInput)}
          {#each dateInput().getSegments() as segment}
            <DateInput.Segment {segment} />
          {/each}
        {/snippet}
      </DateInput.Context>
    </DateInput.SegmentGroup>
  </DateInput.Control>
  <DateInput.HiddenInput />
</DateInput.Root>
