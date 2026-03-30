<script lang="ts">
  import { DateInput } from '@ark-ui/svelte/date-input'
  import { Field } from '@ark-ui/svelte/field'
  import styles from 'styles/date-input.module.css'
  import field from 'styles/field.module.css'
</script>

<Field.Root class={field.Root}>
  <DateInput.Root class={styles.Root} name="birthDate">
    <DateInput.Label class={styles.Label}>Birth Date</DateInput.Label>
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
  <Field.HelperText class={field.HelperText}>Additional Info</Field.HelperText>
  <Field.ErrorText class={field.ErrorText}>Error Message</Field.ErrorText>
</Field.Root>
