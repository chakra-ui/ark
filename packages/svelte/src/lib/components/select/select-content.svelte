<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface SelectContentBaseProps extends PolymorphicProps<'div'> {}
  export interface SelectContentProps extends Assign<HTMLProps<'div'>, SelectContentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '$lib/components/factory'
  import { useSelectContext } from './use-select-context'

  const props: SelectContentProps = $props()
  const select = useSelectContext()
  const mergedProps = $derived(mergeProps(select().getContentProps(), props))
</script>

<Ark as="div" {...mergedProps} />
