<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ItemProps } from '@zag-js/accordion'

  export interface AccordionItemBaseProps extends ItemProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface AccordionItemProps extends Assign<HTMLProps<'div'>, AccordionItemBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { useRenderStrategyPropsContext } from '$lib/utils/render-strategy'
  import { mergeProps } from '@zag-js/svelte'
  import { CollapsibleRoot } from '../collapsible/index.ts'
  import { useAccordionContext } from './use-accordion-context.ts'
  import { AccordionItemProvider } from './use-accordion-item-context.ts'
  import { AccordionItemPropsProvider } from './use-accordion-item-props-context.ts'

  let { ref = $bindable(null), ...props }: AccordionItemProps = $props()
  const [itemProps, localProps] = $derived(createSplitProps<ItemProps>()(props, ['value', 'disabled']))

  const accordion = useAccordionContext()
  const renderStrategy = useRenderStrategyPropsContext()

  const itemState = $derived(accordion().getItemState(itemProps))
  const mergedProps = $derived(mergeProps(accordion().getItemProps(itemProps), localProps))

  const itemContentProps = $derived(accordion().getItemContentProps(itemProps))

  AccordionItemPropsProvider(() => itemProps)
  AccordionItemProvider(() => itemState)
</script>

<CollapsibleRoot
  bind:ref
  open={itemState.expanded}
  ids={{ content: itemContentProps.id ?? undefined }}
  {...renderStrategy()}
  {...mergedProps}
/>
