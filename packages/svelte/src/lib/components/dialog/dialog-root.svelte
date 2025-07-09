<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UsePresenceProps } from '../presence'
  import type { UseDialogProps } from './use-dialog.svelte'

  export interface DialogRootBaseProps extends UseDialogProps, UsePresenceProps {}
  export interface DialogRootProps extends DialogRootBaseProps {
    children?: Snippet
  }
</script>

<script lang="ts">
  import { PresenceProvider, usePresence } from '../presence'
  import { splitPresenceProps } from '../presence/split-presence-props.svelte'
  import { RenderStrategyPropsProvider, splitRenderStrategyProps } from '$lib/utils/render-strategy'
  import { DialogProvider } from './use-dialog-context'
  import { useDialog } from './use-dialog.svelte'

  let { open = $bindable(), children, ...props }: DialogRootProps = $props()

  const providedId = $props.id()

  const [presenceProps, localProps] = $derived(splitPresenceProps(props))
  const [renderStrategyProps] = $derived(splitRenderStrategyProps(presenceProps))

  const machineProps = $derived.by<UseDialogProps>(() => {
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

  const dialog = useDialog(() => machineProps)

  const presenceMachineProps = $derived.by<UsePresenceProps>(() => ({
    ...presenceProps,
    present: dialog().open,
  }))

  const presence = usePresence(() => presenceMachineProps)

  DialogProvider(dialog)
  RenderStrategyPropsProvider(() => renderStrategyProps)
  PresenceProvider(presence)
</script>

{@render children?.()}
