<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseAvatarContext } from './use-avatar-context.ts'

  export interface AvatarContextProps {
    api?: Snippet<[UseAvatarContext]>
  }
</script>

<script lang="ts">
  import { useAvatarContext } from './use-avatar-context.ts'

  const { api }: AvatarContextProps = $props()
  const avatar = useAvatarContext()
</script>

{@render api?.(avatar)}
