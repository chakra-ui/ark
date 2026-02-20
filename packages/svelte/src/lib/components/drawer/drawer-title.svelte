<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface DrawerTitleBaseProps extends PolymorphicProps<'h2'>, RefAttribute {}
  export interface DrawerTitleProps extends Assign<HTMLProps<'h2'>, DrawerTitleBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useDrawerContext } from './use-drawer-context'

  let { ref = $bindable(null), ...props }: DrawerTitleProps = $props()

  const drawer = useDrawerContext()
  const mergedProps = $derived(mergeProps(drawer().getTitleProps(), props))
</script>

<Ark as="h2" bind:ref {...mergedProps} />
