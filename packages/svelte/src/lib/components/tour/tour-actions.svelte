<script lang="ts">
  import type { Accessor } from '$lib/types'
  import type { StepAction } from '@zag-js/tour'
  import type { Snippet } from 'svelte'
  import { useTourContext } from './use-tour-context.ts'

  export interface TourActionsProps {
    children: Snippet<[Accessor<StepAction[]>]>
  }

  const { children }: TourActionsProps = $props()

  const tour = useTourContext()
  const actions = $derived(tour().step?.actions ?? [])
</script>

{@render children(() => actions)}
