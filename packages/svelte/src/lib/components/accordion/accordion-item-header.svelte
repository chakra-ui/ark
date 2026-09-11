<script module lang="ts">
  import type { ItemState } from '@zag-js/accordion'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface AccordionItemHeaderState extends ItemState {}

  export interface AccordionItemHeaderBaseProps
    extends PolymorphicProps<'h3', AccordionItemHeaderState>, RefAttribute {}
  export interface AccordionItemHeaderProps extends Assign<HTMLProps<'h3'>, AccordionItemHeaderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useAccordionContext } from './use-accordion-context.ts'
  import { useAccordionItemPropsContext } from './use-accordion-item-props-context.ts'

  let { ref = $bindable(null), ...props }: AccordionItemHeaderProps = $props()

  const accordion = useAccordionContext()
  const itemProps = useAccordionItemPropsContext()

  const mergedProps = $derived(mergeProps(accordion().getItemHeaderProps(itemProps()), props))
  const itemState = $derived(accordion().getItemState(itemProps()))
</script>

<Ark as="h3" bind:ref {...mergedProps} state={itemState} />
