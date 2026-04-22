<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CascadeSelectLabelBaseProps extends PolymorphicProps<'label'>, RefAttribute {}
  export interface CascadeSelectLabelProps extends Assign<HTMLProps<'label'>, CascadeSelectLabelBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '$lib/components/factory'
  import { mergeProps } from '@zag-js/svelte'
  import { useCascadeSelectContext } from './use-cascade-select-context'

  let { ref = $bindable(null), ...props }: CascadeSelectLabelProps = $props()
  const cascadeSelect = useCascadeSelectContext()
  const mergedProps = $derived(mergeProps(cascadeSelect().getLabelProps(), props))
</script>

<Ark as="label" bind:ref {...mergedProps} />
