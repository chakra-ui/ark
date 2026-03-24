<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface DrawerSwipeAreaBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface DrawerSwipeAreaProps extends Assign<HTMLProps<'div'>, DrawerSwipeAreaBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useDrawerContext } from './use-drawer-context'

  let { ref = $bindable(null), ...props }: DrawerSwipeAreaProps = $props()

  const drawer = useDrawerContext()
  const mergedProps = $derived(mergeProps(drawer().getSwipeAreaProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
