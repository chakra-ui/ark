<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UsePasswordInputReturn } from './use-password-input.svelte'

  interface RootProviderProps {
    value: UsePasswordInputReturn
  }

  export interface PasswordInputRootProviderBaseProps extends RootProviderProps {}
  export interface PasswordInputRootProviderProps extends PasswordInputRootProviderBaseProps {
    children?: Snippet
  }
</script>

<script lang="ts">
  import { PasswordInputProvider } from './use-password-input-context'

  const props: PasswordInputRootProviderProps = $props()

  PasswordInputProvider(() => props.value())
</script>

{@render props.children?.()}
