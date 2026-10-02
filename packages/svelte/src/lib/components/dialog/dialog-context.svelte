<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseDialogContext } from './use-dialog-context.ts'

  export interface DialogContextProps {
    render?: Snippet<[UseDialogContext]>
    /**
     * @deprecated Use `render` instead.
     */
    children?: Snippet<[UseDialogContext]>
  }
</script>

<script lang="ts">
  import { useDialogContext } from './use-dialog-context.ts'

  const { render, children }: DialogContextProps = $props()

  const dialog = useDialogContext()
</script>

{@render (render ?? children)?.(dialog)}
