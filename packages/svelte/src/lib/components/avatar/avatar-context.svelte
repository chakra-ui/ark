<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseAvatarContext } from './use-avatar-context.ts'

  export interface AvatarContextProps {
    render?: Snippet<[UseAvatarContext]>
    /**
     * @deprecated Use `render` instead.
     */
    api?: Snippet<[UseAvatarContext]>
  }
</script>

<script lang="ts">
  import { useAvatarContext } from './use-avatar-context.ts'

  const { render, api }: AvatarContextProps = $props()
  const avatar = useAvatarContext()
</script>

{@render (render ?? api)?.(avatar)}
