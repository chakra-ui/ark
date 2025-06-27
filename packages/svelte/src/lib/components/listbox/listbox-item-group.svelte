<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface ListboxItemGroupBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ListboxItemGroupProps extends Assign<HTMLProps<'div'>, ListboxItemGroupBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useListboxContext } from './use-listbox-context.js'
  import { ListboxItemGroupPropsProvider } from './use-listbox-item-group-props.js'

  let { ref = $bindable(null), ...props }: ListboxItemGroupProps = $props()
  const providedId = $props.id()

  const listbox = useListboxContext()

  const groupProps = $derived({ id: providedId })
  const mergedProps = $derived(mergeProps(listbox().getItemGroupProps(groupProps), props))

  ListboxItemGroupPropsProvider(() => groupProps)
</script>

<Ark as="div" bind:ref {...mergedProps} />
