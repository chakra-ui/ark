<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseFieldReturn } from './use-field.svelte'

  export interface FieldContextProps {
    render: Snippet<[UseFieldReturn]>
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
