<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface AccordionItemContentBaseProps extends PolymorphicProps<'div'> {}
  export interface AccordionItemContentProps extends Assign<HTMLProps<'div'>, AccordionItemContentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { omit } from '@zag-js/utils'
  import { CollapsibleContent } from '../collapsible'
  import { useAccordionContext } from './use-accordion-context'
  import { useAccordionItemPropsContext } from './use-accordion-item-props-context'

  const props: AccordionItemContentProps = $props()

  const accordion = useAccordionContext()
  const itemProps = useAccordionItemPropsContext()

  const contentProps = $derived(accordion().getItemContentProps(itemProps()))
  const itemContentProps = $derived(omit(contentProps, ['hidden', 'data-state']))

  const mergedProps = $derived(mergeProps(itemContentProps, props))
</script>

<CollapsibleContent {...mergedProps} />
