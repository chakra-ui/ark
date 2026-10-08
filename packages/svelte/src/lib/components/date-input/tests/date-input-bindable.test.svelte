<script lang="ts">
  import type { DateValue } from '@zag-js/date-input'
  import { parseDate } from '../../date-picker/index.ts'
  import { DateInput } from '../index.ts'

  let placeholderValue = $state<DateValue>(parseDate('2030-06-15'))
</script>

<DateInput.Root bind:placeholderValue>
  <DateInput.Label>Date</DateInput.Label>
  <DateInput.Control>
    <DateInput.SegmentGroup>
      <DateInput.SegmentContext>
        {#snippet render(segment)}
          <DateInput.Segment {segment} />
        {/snippet}
      </DateInput.SegmentContext>
    </DateInput.SegmentGroup>
  </DateInput.Control>
</DateInput.Root>
<button type="button" onclick={() => (placeholderValue = parseDate('2040-06-15'))}>change</button>
