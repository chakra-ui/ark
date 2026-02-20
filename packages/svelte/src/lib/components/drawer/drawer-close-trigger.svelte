<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface DrawerCloseTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface DrawerCloseTriggerProps extends Assign<HTMLProps<'button'>, DrawerCloseTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useDrawerContext } from './use-drawer-context'

  let { ref = $bindable(null), ...props }: DrawerCloseTriggerProps = $props()

  const drawer = useDrawerContext()
  const mergedProps = $derived(mergeProps(drawer().getCloseTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
