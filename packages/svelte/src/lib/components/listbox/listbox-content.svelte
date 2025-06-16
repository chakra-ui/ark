<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'

  export interface ListboxContentBaseProps extends PolymorphicProps<'div'> {}
  export interface ListboxContentProps extends Assign<HTMLProps<'div'>, ListboxContentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useListboxContext } from './use-listbox-context.js'

  const props: ListboxContentProps = $props()

  const listbox = useListboxContext()
  const mergedProps = $derived(mergeProps(listbox().getContentProps(), props))
</script>

<Ark as="div" {...mergedProps} />
