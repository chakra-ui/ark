<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useTourContext, type UseTourContext } from './use-tour-context.ts'

  export interface TourContextProps {
    render: Snippet<[UseTourContext]>
  }

  const { render }: TourContextProps = $props()

  const tour = useTourContext()
</script>

{@render render(tour)}
