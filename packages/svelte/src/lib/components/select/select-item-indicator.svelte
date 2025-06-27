<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SelectItemIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface SelectItemIndicatorProps extends Assign<HTMLProps<'div'>, SelectItemIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '$lib/components/factory'
  import { useSelectContext } from './use-select-context'
  import { useSelectItemPropsContext } from './use-select-item-props-context'

  let { ref = $bindable(null), ...props }: SelectItemIndicatorProps = $props()
  const select = useSelectContext()
  const itemProps = useSelectItemPropsContext()
  const mergedProps = $derived(mergeProps(select().getItemIndicatorProps(itemProps()), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
