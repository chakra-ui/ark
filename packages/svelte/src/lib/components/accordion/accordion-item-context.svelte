<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseAccordionItemContext } from './use-accordion-item-context'

  export interface AccordionItemContextProps {
    render: Snippet<[UseAccordionItemContext]>
  }
</script>

<script lang="ts">
  import { AccordionItemProvider, useAccordionItemContext } from './use-accordion-item-context'

  const { render }: AccordionItemContextProps = $props()

  const itemState = useAccordionItemContext()
  AccordionItemProvider(itemState)
</script>

{@render render(itemState)}
