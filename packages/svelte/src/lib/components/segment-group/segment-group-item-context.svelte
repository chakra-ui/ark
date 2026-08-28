<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseSegmentGroupItemContext } from './use-segment-group-item-context.ts'

  export interface SegmentGroupItemContextProps {
    render: Snippet<[UseSegmentGroupItemContext]>
  }
</script>

<script lang="ts">
  import { useSegmentGroupItemContext } from './use-segment-group-item-context.ts'

  let { render }: SegmentGroupItemContextProps = $props()

  const context = useSegmentGroupItemContext()
</script>

{@render render(context)}
