<script lang="ts">
  import { DateInput } from '@ark-ui/svelte/date-input'
</script>

<DateInput.Root>
  <DateInput.Label>Date</DateInput.Label>
  <DateInput.Control>
    <DateInput.SegmentGroup>
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
