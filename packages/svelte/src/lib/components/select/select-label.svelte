<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SelectLabelBaseProps extends PolymorphicProps<'label'>, RefAttribute {}
  export interface SelectLabelProps extends Assign<HTMLProps<'label'>, SelectLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '$lib/components/factory'
  import { useSelectContext } from './use-select-context'

  let { ref = $bindable(null), ...props }: SelectLabelProps = $props()
  const select = useSelectContext()
  const mergedProps = $derived(mergeProps(select().getLabelProps(), props))
</script>

<Ark as="label" bind:ref {...mergedProps} />
