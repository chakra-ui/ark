<script lang="ts" module>
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'

  export interface FloatingPanelBodyBaseProps extends PolymorphicProps<'div'> {}
  export interface FloatingPanelBodyProps extends Assign<HTMLProps<'div'>, FloatingPanelBodyBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useFloatingPanelContext } from './use-floating-panel-context.js'

  let props: FloatingPanelBodyProps = $props()

  const floatingPanel = useFloatingPanelContext()
  const mergedProps = $derived(mergeProps(floatingPanel().getBodyProps(), props))
</script>

<Ark as="div" {...mergedProps} />
