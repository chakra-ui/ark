<script module lang="ts">
  import type { Snippet } from 'svelte'

  export interface AccordionItemContextProps {
    render: Snippet
  }
</script>

<script lang="ts">
  import { AccordionItemProvider, useAccordionItemContext } from './use-accordion-item-context'

  const { render }: AccordionItemContextProps = $props()

  const itemState = useAccordionItemContext()
  AccordionItemProvider(itemState)
</script>

{@render render()}
