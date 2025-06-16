<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'

  export interface ListboxItemGroupBaseProps extends PolymorphicProps<'div'> {}
  export interface ListboxItemGroupProps extends Assign<HTMLProps<'div'>, ListboxItemGroupBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useListboxContext } from './use-listbox-context.js'
  import { ListboxItemGroupPropsProvider } from './use-listbox-item-group-props.js'

  const props: ListboxItemGroupProps = $props()
  const providedId = $props.id()

  const listbox = useListboxContext()

  const groupProps = $derived({ id: providedId })
  const mergedProps = $derived(mergeProps(listbox().getItemGroupProps(groupProps), props))

  ListboxItemGroupPropsProvider(() => groupProps)
</script>

<Ark as="div" {...mergedProps} />
