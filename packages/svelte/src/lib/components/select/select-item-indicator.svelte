<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SelectItemIndicatorBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface SelectItemIndicatorProps extends Assign<HTMLProps<'span'>, SelectItemIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '$lib/components/factory'
  import { useSelectContext } from './use-select-context.ts'
  import { useSelectItemPropsContext } from './use-select-item-props-context.ts'

  let { ref = $bindable(null), ...props }: SelectItemIndicatorProps = $props()
  const select = useSelectContext()
  const itemProps = useSelectItemPropsContext()
  const mergedProps = $derived(mergeProps(select().getItemIndicatorProps(itemProps()), props))
</script>

<Ark as="span" bind:ref {...mergedProps} />
