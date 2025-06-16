<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseEditableContext } from './use-editable-context'

  export interface EditableContextProps {
    render: Snippet<[UseEditableContext]>
  }
</script>

<script lang="ts">
  import { useEditableContext } from './use-editable-context'

  const { render }: EditableContextProps = $props()

  const editable = useEditableContext()
</script>

{@render render(editable)}
