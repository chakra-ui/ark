<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UsePasswordInputContext } from './use-password-input-context.ts'

  export interface PasswordInputContextProps {
    render?: Snippet<[UsePasswordInputContext]>
  }
</script>

<script lang="ts">
  import { usePasswordInputContext } from './use-password-input-context.ts'

  const { render }: PasswordInputContextProps = $props()

  const context = usePasswordInputContext()
</script>

{@render render?.(context)}
