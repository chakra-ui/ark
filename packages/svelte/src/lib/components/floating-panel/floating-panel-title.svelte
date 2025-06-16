<script lang="ts" module>
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'

  export interface FloatingPanelTitleBaseProps extends PolymorphicProps<'h2'> {}
  export interface FloatingPanelTitleProps extends Assign<HTMLProps<'h2'>, FloatingPanelTitleBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useFloatingPanelContext } from './use-floating-panel-context.js'

  let props: FloatingPanelTitleProps = $props()

  const floatingPanel = useFloatingPanelContext()
  const mergedProps = $derived(mergeProps(floatingPanel().getTitleProps(), props))
</script>

<Ark as="h2" {...mergedProps} />
