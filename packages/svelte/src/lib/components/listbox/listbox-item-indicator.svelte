<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface ListboxItemIndicatorBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface ListboxItemIndicatorProps extends Assign<HTMLProps<'span'>, ListboxItemIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useListboxContext } from './use-listbox-context.js'
  import { useListboxItemPropsContext } from './use-listbox-item-props-context.js'

  let { ref = $bindable(null), ...props }: ListboxItemIndicatorProps = $props()

  const listbox = useListboxContext()
  const itemProps = useListboxItemPropsContext()
  const mergedProps = $derived(mergeProps(listbox().getItemIndicatorProps(itemProps()), props))
</script>

<Ark as="span" bind:ref {...mergedProps} />
