<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseDialogReturn } from './use-dialog.svelte'

  export interface DialogRootProviderBaseProps {
    value: UseDialogReturn
  }
  export interface DialogRootProviderProps extends DialogRootProviderBaseProps {
    children?: Snippet
  }
</script>

<script lang="ts">
  import { RenderStrategyPropsProvider, splitRenderStrategyProps } from '$lib/utils/render-strategy'
  import { PresenceProvider, usePresence } from '../presence'
  import { splitPresenceProps } from '../presence/split-presence-props.svelte'
  import { DialogProvider } from './use-dialog-context'

  let { value, children, ...props }: DialogRootProviderProps = $props()

  const [presenceProps] = $derived(splitPresenceProps(props))
  const [renderStrategyProps] = $derived(splitRenderStrategyProps(presenceProps))

  const presenceMachineProps = $derived.by(() => ({
    ...presenceProps,
    present: value().open,
  }))

  const presence = usePresence(() => presenceMachineProps)

  DialogProvider(value)
  RenderStrategyPropsProvider(() => renderStrategyProps)
  PresenceProvider(presence)
</script>

{@render children?.()}
