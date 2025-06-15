<script module lang="ts">
  import type { Snippet } from 'svelte'

  export interface AccordionContextProps {
    render: Snippet<[UseAccordionContext]>
  }
</script>

<script lang="ts">
  import { useAccordionContext, type UseAccordionContext } from './use-accordion-context'

  const { render }: AccordionContextProps = $props()

  const accordion = useAccordionContext()
</script>

{@render render(accordion)}
