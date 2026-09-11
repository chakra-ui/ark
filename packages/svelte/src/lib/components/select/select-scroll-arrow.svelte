<script module lang="ts">
  import type { ScrollArrowProps } from '@zag-js/select'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SelectScrollArrowBaseProps extends ScrollArrowProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface SelectScrollArrowProps extends Assign<HTMLProps<'div'>, SelectScrollArrowBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '$lib/components/factory'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { useSelectContext } from './use-select-context.ts'

  let { ref = $bindable(null), ...props }: SelectScrollArrowProps = $props()
  const [scrollArrowProps, localProps] = $derived(createSplitProps<ScrollArrowProps>()(props, ['placement']))
  const select = useSelectContext()
  const mergedProps = $derived(mergeProps(select().getScrollArrowProps(scrollArrowProps), localProps))
</script>

<Ark as="div" bind:ref {...mergedProps} />
