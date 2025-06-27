<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface ListboxItemTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface ListboxItemTextProps extends Assign<HTMLProps<'span'>, ListboxItemTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useListboxContext } from './use-listbox-context.js'
  import { useListboxItemPropsContext } from './use-listbox-item-props-context.js'

  let { ref = $bindable(null), ...props }: ListboxItemTextProps = $props()

  const listbox = useListboxContext()
  const itemProps = useListboxItemPropsContext()
  const mergedProps = $derived(mergeProps(listbox().getItemTextProps(itemProps()), props))
</script>

<Ark as="span" bind:ref {...mergedProps} />
