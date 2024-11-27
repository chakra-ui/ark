<script module lang="ts">
import type { UseAvatarContext } from './use-avatar-context'

export interface AvatarContextProps {
  api?: (avatar: UseAvatarContext) => any
}
</script>

<script lang="ts">
  import { useAvatarContext } from './use-avatar-context'

  const { api }: AvatarContextProps = $props()
  const avatar = useAvatarContext()
</script>

{@render api?.(avatar)}
