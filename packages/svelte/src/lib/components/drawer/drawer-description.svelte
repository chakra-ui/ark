<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface DrawerDescriptionBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface DrawerDescriptionProps extends Assign<HTMLProps<'div'>, DrawerDescriptionBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useDrawerContext } from './use-drawer-context'

  let { ref = $bindable(null), ...props }: DrawerDescriptionProps = $props()

  const drawer = useDrawerContext()
  const mergedProps = $derived(mergeProps(drawer().getDescriptionProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
