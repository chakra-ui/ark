<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { DateSegment } from '@zag-js/date-input'

  export interface DateInputSegmentContextProps {
    render: Snippet<[DateSegment]>
  }
</script>

<script lang="ts">
  import { useDateInputContext } from './use-date-input-context.js'
  import { useDateInputSegmentGroupPropsContext } from './use-date-input-segment-group-props-context.js'

  let { render }: DateInputSegmentContextProps = $props()

  const context = useDateInputContext()
  const segmentGroupProps = useDateInputSegmentGroupPropsContext()
</script>

{#each context().getSegments(segmentGroupProps()) as segment}
  {@render render(segment)}
{/each}
