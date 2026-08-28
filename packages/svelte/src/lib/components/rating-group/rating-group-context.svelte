<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseRatingGroupContext } from './use-rating-group-context.ts'

  export interface RatingGroupContextProps {
    render: Snippet<[UseRatingGroupContext]>
  }
</script>

<script lang="ts">
  import { useRatingGroupContext } from './use-rating-group-context.ts'

  const { render }: RatingGroupContextProps = $props()
  const context = useRatingGroupContext()
</script>

{@render render(context)}
