<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UsePresenceProps } from '../presence'
  import type { UseBottomSheetProps } from './use-bottom-sheet.svelte'

  export interface BottomSheetRootBaseProps extends UseBottomSheetProps, UsePresenceProps {}
  export interface BottomSheetRootProps extends BottomSheetRootBaseProps {
    children?: Snippet
  }
</script>

<script lang="ts">
  import { PresenceProvider, usePresence } from '../presence'
  import { splitPresenceProps } from '../presence/split-presence-props.svelte'
  import { RenderStrategyPropsProvider, splitRenderStrategyProps } from '$lib/utils/render-strategy'
  import { BottomSheetProvider } from './use-bottom-sheet-context'
  import { useBottomSheet } from './use-bottom-sheet.svelte'

  let { open = $bindable(), children, ...props }: BottomSheetRootProps = $props()

  const providedId = $props.id()

  const [presenceProps, localProps] = $derived(splitPresenceProps(props))
  const [renderStrategyProps] = $derived(splitRenderStrategyProps(presenceProps))

  const machineProps = $derived.by<UseBottomSheetProps>(() => {
    return {
      ...localProps,
      id: localProps.id ?? providedId,
      open,
      onOpenChange(details) {
        localProps.onOpenChange?.(details)
        if (open !== undefined) open = details.open
      },
    }
  })

  const bottomSheet = useBottomSheet(() => machineProps)

  const presenceMachineProps = $derived.by<UsePresenceProps>(() => ({
    ...presenceProps,
    present: bottomSheet().open,
  }))

  const presence = usePresence(() => presenceMachineProps)

  BottomSheetProvider(bottomSheet)
  RenderStrategyPropsProvider(() => renderStrategyProps)
  PresenceProvider(presence)
</script>

{@render children?.()}
