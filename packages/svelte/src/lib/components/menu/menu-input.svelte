<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface MenuInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface MenuInputProps extends Assign<HTMLProps<'input'>, MenuInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useMenuContext } from './use-menu-context.ts'

  let { ref = $bindable(null), ...props }: MenuInputProps = $props()

  const menu = useMenuContext()
  const mergedProps = $derived(mergeProps(menu().getInputProps(), props))
</script>

<Ark as="input" bind:ref {...mergedProps} />
