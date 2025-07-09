<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface ListboxContentBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ListboxContentProps extends Assign<HTMLProps<'div'>, ListboxContentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useListboxContext } from './use-listbox-context.js'

  let { ref = $bindable(null), ...props }: ListboxContentProps = $props()

  const listbox = useListboxContext()
  const mergedProps = $derived(mergeProps(listbox().getContentProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
