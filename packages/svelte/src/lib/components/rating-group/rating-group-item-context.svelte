<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseRatingGroupItemContext } from './use-rating-group-item-context'

  export interface RatingGroupItemContextProps {
    render: Snippet<[UseRatingGroupItemContext]>
  }
</script>

<script lang="ts">
  import { useRatingGroupItemContext } from './use-rating-group-item-context'

  const { render }: RatingGroupItemContextProps = $props()
  const context = useRatingGroupItemContext()
</script>

{@render render(context)}
