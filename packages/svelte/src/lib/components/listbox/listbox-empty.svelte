<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ListboxEmptyBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ListboxEmptyProps extends Assign<HTMLProps<'div'>, ListboxEmptyBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '../factory/index.ts'
  import { listboxAnatomy } from './listbox.anatomy.ts'
  import { useListboxContext } from './use-listbox-context.ts'

  const parts = listboxAnatomy.build()

  let { ref = $bindable(null), children, ...restProps }: ListboxEmptyProps = $props()

  const listbox = useListboxContext()
  const isEmpty = $derived(listbox().collection.size === 0)
</script>

<!-- stays mounted so the live region is already known to screen readers when the
     message appears; only the children are conditional -->
<Ark as="div" bind:ref {...parts.empty.attrs('')} role="status" aria-live="polite" aria-atomic="true" {...restProps}>
  {#if isEmpty}{@render children?.()}{/if}
</Ark>
