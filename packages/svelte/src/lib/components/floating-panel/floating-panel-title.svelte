<script lang="ts" module>
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface FloatingPanelTitleBaseProps extends PolymorphicProps<'h2'>, RefAttribute {}
  export interface FloatingPanelTitleProps extends Assign<HTMLProps<'h2'>, FloatingPanelTitleBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useFloatingPanelContext } from './use-floating-panel-context.js'

  let { ref = $bindable(null), ...props }: FloatingPanelTitleProps = $props()

  const floatingPanel = useFloatingPanelContext()
  const mergedProps = $derived(mergeProps(floatingPanel().getTitleProps(), props))
</script>

<Ark as="h2" bind:ref {...mergedProps} />
