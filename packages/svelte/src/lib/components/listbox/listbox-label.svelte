<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'

  export interface ListboxLabelBaseProps extends PolymorphicProps<'label'> {}
  export interface ListboxLabelProps extends Assign<HTMLProps<'label'>, ListboxLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useListboxContext } from './use-listbox-context.js'

  const props: ListboxLabelProps = $props()

  const listbox = useListboxContext()
  const mergedProps = $derived(mergeProps(listbox().getLabelProps(), props))
</script>

<Ark as="label" {...mergedProps} />
