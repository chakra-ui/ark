<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseBottomSheetReturn } from './use-bottom-sheet.svelte'

  export interface BottomSheetRootProviderBaseProps {
    value: UseBottomSheetReturn
  }
  export interface BottomSheetRootProviderProps extends BottomSheetRootProviderBaseProps {
    children?: Snippet
  }
</script>

<script lang="ts">
  import { RenderStrategyPropsProvider, splitRenderStrategyProps } from '$lib/utils/render-strategy'
  import { PresenceProvider, usePresence } from '../presence'
  import { splitPresenceProps } from '../presence/split-presence-props.svelte'
  import { BottomSheetProvider } from './use-bottom-sheet-context'

  let { value, children, ...props }: BottomSheetRootProviderProps = $props()

  const [presenceProps] = $derived(splitPresenceProps(props))
  const [renderStrategyProps] = $derived(splitRenderStrategyProps(presenceProps))

  const presenceMachineProps = $derived.by(() => ({
    ...presenceProps,
    present: value().open,
  }))

  const presence = usePresence(() => presenceMachineProps)

  BottomSheetProvider(value)
  RenderStrategyPropsProvider(() => renderStrategyProps)
  PresenceProvider(presence)
</script>

{@render children?.()}
