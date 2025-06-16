<script lang="ts" module>
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'

  export interface FloatingPanelHeaderBaseProps extends PolymorphicProps<'div'> {}
  export interface FloatingPanelHeaderProps extends Assign<HTMLProps<'div'>, FloatingPanelHeaderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useFloatingPanelContext } from './use-floating-panel-context.js'

  let props: FloatingPanelHeaderProps = $props()

  const floatingPanel = useFloatingPanelContext()
  const mergedProps = $derived(mergeProps(floatingPanel().getHeaderProps(), props))
</script>

<Ark as="div" {...mergedProps} />
