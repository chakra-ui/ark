<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface DrawerGrabberBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface DrawerGrabberProps extends Assign<HTMLProps<'div'>, DrawerGrabberBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useDrawerContext } from './use-drawer-context'

  let { ref = $bindable(null), ...props }: DrawerGrabberProps = $props()

  const drawer = useDrawerContext()
  const mergedProps = $derived(mergeProps(drawer().getGrabberProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
