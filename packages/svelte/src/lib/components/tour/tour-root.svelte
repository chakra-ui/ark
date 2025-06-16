<script lang="ts">
  import { RenderStrategyPropsProvider, splitRenderStrategyProps } from '$lib/utils/render-strategy'
  import type { Snippet } from 'svelte'
  import { PresenceProvider, splitPresenceProps, usePresence, type UsePresenceProps } from '../presence'
  import { TourProvider } from './use-tour-context'
  import type { UseTourReturn } from './use-tour.svelte'

  export interface TourRootBaseProps extends UsePresenceProps {
    tour: UseTourReturn
    children?: Snippet
  }
  export interface TourRootProps extends TourRootBaseProps {}

  const props: TourRootProps = $props()

  const [presenceProps, localProps] = $derived(splitPresenceProps(props))
  const [renderStrategyProps] = $derived(splitRenderStrategyProps(presenceProps))

  const presence = usePresence(() => ({
    present: localProps.tour().open,
    ...presenceProps,
  }))

  TourProvider(() => localProps.tour())
  RenderStrategyPropsProvider(() => renderStrategyProps)
  PresenceProvider(presence)
</script>

{@render localProps.children?.()}
