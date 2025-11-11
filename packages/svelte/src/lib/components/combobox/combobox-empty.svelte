<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ComboboxEmptyBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ComboboxEmptyProps extends Assign<HTMLProps<'div'>, ComboboxEmptyBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '../factory'
  import { comboboxAnatomy } from './combobox.anatomy'
  import { useComboboxContext } from './use-combobox-context'

  const parts = comboboxAnatomy.build()

  let { ref = $bindable(null), ...props }: ComboboxEmptyProps = $props()

  const combobox = useComboboxContext()
  const isEmpty = $derived(combobox().collection.size === 0)
</script>

{#if isEmpty}
  <Ark as="div" bind:ref {...parts.empty.attrs} {...props} role="presentation" />
{/if}
