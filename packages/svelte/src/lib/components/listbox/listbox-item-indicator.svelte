<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'

  export interface ListboxItemIndicatorBaseProps extends PolymorphicProps<'div'> {}
  export interface ListboxItemIndicatorProps extends Assign<HTMLProps<'div'>, ListboxItemIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useListboxContext } from './use-listbox-context.js'
  import { useListboxItemPropsContext } from './use-listbox-item-props-context.js'

  const props: ListboxItemIndicatorProps = $props()

  const listbox = useListboxContext()
  const itemProps = useListboxItemPropsContext()
  const mergedProps = $derived(mergeProps(listbox().getItemIndicatorProps(itemProps()), props))
</script>

<Ark as="div" {...mergedProps} />
