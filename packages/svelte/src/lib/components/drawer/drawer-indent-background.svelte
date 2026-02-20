<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface DrawerIndentBackgroundBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface DrawerIndentBackgroundProps extends Assign<HTMLProps<'div'>, DrawerIndentBackgroundBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useDrawerStackContext } from './use-drawer-stack-context'

  let { ref = $bindable(null), ...props }: DrawerIndentBackgroundProps = $props()

  const stackApi = useDrawerStackContext()
  const mergedProps = $derived(mergeProps(stackApi().getIndentBackgroundProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
