<script lang="ts" module>
  import type { PolymorphicProps } from '$lib/types.js'
  import type { Snippet } from 'svelte'
  import type { UsePresenceProps } from '../presence/use-presence.svelte.js'
  import type { UseFloatingPanelProps } from './use-floating-panel.svelte.js'

  export interface FloatingPanelRootBaseProps
    extends UseFloatingPanelProps, UsePresenceProps, PolymorphicProps<'div'> {}
  export interface FloatingPanelRootProps extends FloatingPanelRootBaseProps {
    children?: Snippet
  }
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props.js'
  import { mergeProps } from '@zag-js/svelte'
  import { PresenceProvider, splitPresenceProps, usePresence } from '../presence/index.js'
  import { FloatingPanelProvider } from './use-floating-panel-context.js'
  import { useFloatingPanel } from './use-floating-panel.svelte.js'

  let { open = $bindable(), position = $bindable(), size = $bindable(), ...props }: FloatingPanelRootProps = $props()
  const providedId = $props.id()

  const [presenceProps, otherProps] = $derived(splitPresenceProps(props))
  const [floatingPanelProps, localProps] = $derived(
    createSplitProps<UseFloatingPanelProps>()(otherProps, [
      'allowOverflow',
      'closeOnEscape',
      'defaultOpen',
      'defaultPosition',
      'defaultSize',
      'dir',
      'disabled',
      'draggable',
      'getAnchorPosition',
      'getBoundaryEl',
      'gridSize',
      'id',
      'ids',
      'lockAspectRatio',
      'maxSize',
      'minSize',
      'onOpenChange',
      'onPositionChange',
      'onPositionChangeEnd',
      'onSizeChange',
      'onSizeChangeEnd',
      'onStageChange',
      'open',
      'persistRect',
      'position',
      'resizable',
      'size',
      'strategy',
      'translations',
    ]),
  )

  const resolvedProps = $derived<UseFloatingPanelProps>({
    ...floatingPanelProps,
    id: floatingPanelProps.id ?? providedId,
    open,
    onOpenChange(details) {
      floatingPanelProps.onOpenChange?.(details)
      if (open !== undefined) open = details.open
    },
    position,
    onPositionChange(details) {
      floatingPanelProps.onPositionChange?.(details)
      if (position !== undefined) position = details.position
    },
    size,
    onSizeChange(details) {
      floatingPanelProps.onSizeChange?.(details)
      if (size !== undefined) size = details.size
    },
  })

  const floatingPanel = useFloatingPanel(() => resolvedProps)
  FloatingPanelProvider(floatingPanel)

  const usePresenceProps = $derived(mergeProps({ present: floatingPanel().open }, presenceProps))
  const presence = usePresence(() => usePresenceProps)

  PresenceProvider(presence)
</script>

{@render localProps.children?.()}
