<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface SelectListBaseProps extends PolymorphicProps<'div'> {}
  export interface SelectListProps extends Assign<HTMLProps<'div'>, SelectListBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '$lib/components/factory'
  import { useSelectContext } from './use-select-context'

  const props: SelectListProps = $props()
  const select = useSelectContext()
  const mergedProps = $derived(mergeProps(select().getListProps(), props))
</script>

<Ark as="div" {...mergedProps} />
