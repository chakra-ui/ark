<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface AccordionItemTriggerBaseProps extends PolymorphicProps<'button'> {}
  export interface AccordionItemTriggerProps extends Assign<HTMLProps<'button'>, AccordionItemTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { useCollapsibleContext } from '../collapsible'
  import { Ark } from '../factory'
  import { useAccordionContext } from './use-accordion-context'
  import { useAccordionItemPropsContext } from './use-accordion-item-props-context'

  const props: AccordionItemTriggerProps = $props()

  const accordion = useAccordionContext()
  const itemProps = useAccordionItemPropsContext()

  const collapsible = useCollapsibleContext()
  const triggerProps = $derived(accordion().getItemTriggerProps(itemProps()))

  const mergedProps = $derived(
    mergeProps(
      {
        ...triggerProps,
        'aria-controls': collapsible().isUnmounted ? undefined : triggerProps['aria-controls'],
      },
      props,
    ),
  )
</script>

<Ark as="button" {...mergedProps} />
