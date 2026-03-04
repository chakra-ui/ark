<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseFieldContext } from './use-field-context'

  export interface FieldContextProps {
    render: Snippet<[UseFieldContext]>
  }
</script>

<script lang="ts">
  import { useFieldContext } from './use-field-context'

  const props: FieldContextProps = $props()
  const field = useFieldContext()
</script>

{#if field}
  {@render props.render(field)}
{/if}
