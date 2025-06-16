<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useTourContext, type UseTourContext } from './use-tour-context'

  export interface TourContextProps {
    render: Snippet<[UseTourContext]>
  }

  let { render }: TourContextProps = $props()

  const tour = useTourContext()
</script>

{@render render(tour)}
