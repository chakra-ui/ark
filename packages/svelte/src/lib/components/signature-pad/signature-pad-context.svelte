<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseSignaturePadContext } from './use-signature-pad-context'

  export interface SignaturePadContextProps {
    render: Snippet<[UseSignaturePadContext]>
  }
</script>

<script lang="ts">
  import { useSignaturePadContext } from './use-signature-pad-context'

  let { render }: SignaturePadContextProps = $props()

  const signaturePadContext = useSignaturePadContext()
</script>

{@render render(signaturePadContext)}
