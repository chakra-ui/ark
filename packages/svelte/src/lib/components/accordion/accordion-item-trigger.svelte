<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface AccordionItemTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface AccordionItemTriggerProps extends Assign<HTMLProps<'button'>, AccordionItemTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { useCollapsibleContext } from '../collapsible/index.ts'
  import { Ark } from '../factory/index.ts'
  import { useAccordionContext } from './use-accordion-context.ts'
  import { useAccordionItemPropsContext } from './use-accordion-item-props-context.ts'

  let { ref = $bindable(null), ...props }: AccordionItemTriggerProps = $props()

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

<Ark bind:ref as="button" {...mergedProps} />
