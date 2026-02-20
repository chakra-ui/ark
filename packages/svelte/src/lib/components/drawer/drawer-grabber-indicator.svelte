<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface DrawerGrabberIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface DrawerGrabberIndicatorProps extends Assign<
    HTMLProps<'div'>,
    DrawerGrabberIndicatorBaseProps
  > {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useDrawerContext } from './use-drawer-context'

  let { ref = $bindable(null), ...props }: DrawerGrabberIndicatorProps = $props()

  const drawer = useDrawerContext()
  const mergedProps = $derived(mergeProps(drawer().getGrabberIndicatorProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
