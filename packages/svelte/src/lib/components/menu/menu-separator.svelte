<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface MenuSeparatorBaseProps extends PolymorphicProps<'hr'>, RefAttribute {}
  export interface MenuSeparatorProps extends Assign<HTMLProps<'hr'>, MenuSeparatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useMenuContext } from './use-menu-context.ts'

  let { ref = $bindable(null), ...props }: MenuSeparatorProps = $props()

  const menu = useMenuContext()
  const mergedProps = $derived(mergeProps(menu().getSeparatorProps(), props))
</script>

<Ark as="hr" bind:ref {...mergedProps} />
