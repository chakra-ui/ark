<script lang="ts" module>
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface FloatingPanelCloseTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface FloatingPanelCloseTriggerProps
    extends Assign<HTMLProps<'button'>, FloatingPanelCloseTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useFloatingPanelContext } from './use-floating-panel-context.js'

  let { ref = $bindable(null), ...props }: FloatingPanelCloseTriggerProps = $props()

  const floatingPanel = useFloatingPanelContext()
  const mergedProps = $derived(mergeProps(floatingPanel().getCloseTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
