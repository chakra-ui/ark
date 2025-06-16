<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'

  export interface ListboxItemGroupLabelBaseProps extends PolymorphicProps<'div'> {}
  export interface ListboxItemGroupLabelProps extends Assign<HTMLProps<'div'>, ListboxItemGroupLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useListboxContext } from './use-listbox-context.js'
  import { useListboxItemGroupPropsContext } from './use-listbox-item-group-props.js'

  const props: ListboxItemGroupLabelProps = $props()

  const listbox = useListboxContext()
  const groupProps = useListboxItemGroupPropsContext()
  const mergedProps = $derived(mergeProps(listbox().getItemGroupLabelProps({ htmlFor: groupProps().id }), props))
</script>

<Ark as="div" {...mergedProps} />
