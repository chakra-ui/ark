<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseFieldsetReturn } from './use-fieldset.svelte'

  export interface FieldsetContextProps {
    render: Snippet<[UseFieldsetReturn]>
  }
</script>

<script lang="ts">
  import { useFieldsetContext } from './use-fieldset-context'

  const props: FieldsetContextProps = $props()
  const fieldset = useFieldsetContext()
</script>

{#if fieldset}
  {@render props.render(fieldset)}
{/if}
