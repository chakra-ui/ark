<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ComboboxEmptyBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ComboboxEmptyProps extends Assign<HTMLProps<'div'>, ComboboxEmptyBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '../factory/index.ts'
  import { comboboxAnatomy } from './combobox.anatomy.ts'
  import { useComboboxContext } from './use-combobox-context.ts'

  const parts = comboboxAnatomy.build()

  let { ref = $bindable(null), children, ...restProps }: ComboboxEmptyProps = $props()

  const combobox = useComboboxContext()
  const isEmpty = $derived(combobox().collection.size === 0)
</script>

<!-- stays mounted so the live region is already known to screen readers when the
     message appears; only the children are conditional -->
<Ark as="div" bind:ref {...parts.empty.attrs('')} role="status" aria-live="polite" aria-atomic="true" {...restProps}>
  {#if isEmpty}{@render children?.()}{/if}
</Ark>
