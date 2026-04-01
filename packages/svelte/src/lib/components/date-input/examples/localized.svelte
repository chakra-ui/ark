<script lang="ts">
  import { DateInput } from '@ark-ui/svelte/date-input'
  import { LocaleProvider } from '@ark-ui/svelte/locale'
  import styles from 'styles/date-input.module.css'
</script>

<LocaleProvider locale="fr-FR">
  <DateInput.Root class={styles.Root} granularity="minute" hourCycle={24}>
    <DateInput.Label class={styles.Label}>Date et heure</DateInput.Label>
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
</LocaleProvider>
