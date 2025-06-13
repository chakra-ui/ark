<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UsePinInputReturn } from './use-pin-input.svelte'

  interface RootProviderProps {
    value: UsePinInputReturn
  }

  export interface PinInputRootProviderBaseProps extends RootProviderProps {}
  export interface PinInputRootProviderProps extends PinInputRootProviderBaseProps {
    children?: Snippet
  }
</script>

<script lang="ts">
  import { PinInputProvider } from './use-pin-input-context'

  const props: PinInputRootProviderProps = $props()

  PinInputProvider(() => props.value())
</script>

{@render props.children?.()}
