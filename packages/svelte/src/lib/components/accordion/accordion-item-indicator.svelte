<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface AccordionItemIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface AccordionItemIndicatorProps extends Assign<HTMLProps<'div'>, AccordionItemIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useAccordionContext } from './use-accordion-context'
  import { useAccordionItemPropsContext } from './use-accordion-item-props-context'

  let { ref = $bindable(), ...props }: AccordionItemIndicatorProps = $props()

  const accordion = useAccordionContext()
  const itemProps = useAccordionItemPropsContext()

  const mergedProps = $derived(mergeProps(accordion().getItemIndicatorProps(itemProps()), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
