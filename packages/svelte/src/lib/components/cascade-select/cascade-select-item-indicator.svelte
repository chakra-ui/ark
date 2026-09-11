<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CascadeSelectItemIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface CascadeSelectItemIndicatorProps extends Assign<
    HTMLProps<'div'>,
    CascadeSelectItemIndicatorBaseProps
  > {}
</script>

<script lang="ts">
  import { Ark } from '$lib/components/factory'
  import { mergeProps } from '@zag-js/svelte'
  import { useCascadeSelectContext } from './use-cascade-select-context'
  import { useCascadeSelectItemPropsContext } from './use-cascade-select-item-props-context'

  let { ref = $bindable(null), ...props }: CascadeSelectItemIndicatorProps = $props()
  const cascadeSelect = useCascadeSelectContext()
  const itemProps = useCascadeSelectItemPropsContext()
  const mergedProps = $derived(mergeProps(cascadeSelect().getItemIndicatorProps(itemProps()), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
