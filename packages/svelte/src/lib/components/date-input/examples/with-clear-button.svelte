<script lang="ts">
  import { DateInput, useDateInput } from '@ark-ui/svelte/date-input'
  import { XIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/date-input.module.css'

  const id = $props.id()
  const dateInput = useDateInput({ id })
</script>

<DateInput.RootProvider value={dateInput} class={styles.Root}>
  <DateInput.Label class={styles.Label}>Date</DateInput.Label>
  <DateInput.Control class={styles.Control}>
    <DateInput.SegmentGroup class={styles.SegmentGroup}>
      <DateInput.SegmentContext>
        {#snippet render(segment)}
          <DateInput.Segment class={styles.Segment} {segment} />
        {/snippet}
      </DateInput.SegmentContext>
    </DateInput.SegmentGroup>
    <button aria-label="Clear date" class={button.Root} type="button" onclick={() => dateInput().clearValue()}>
      <XIcon />
    </button>
  </DateInput.Control>
  <DateInput.HiddenInput />
</DateInput.RootProvider>
