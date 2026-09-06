<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface ListboxListBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ListboxListProps extends Assign<HTMLProps<'div'>, ListboxListBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useListboxContext } from './use-listbox-context.js'

  let { ref = $bindable(null), ...props }: ListboxListProps = $props()

  const listbox = useListboxContext()
  const mergedProps = $derived(mergeProps(listbox().getListProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
