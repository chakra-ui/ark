<script module lang="ts">
export interface AvatarFallbackProps {
  children: Snippet
}
</script>
        
<script lang="ts">
import type { Snippet } from "svelte"
import { useAvatarContext } from "./use-avatar-context"

const { children }: AvatarFallbackProps = $props()
const avatar = useAvatarContext()
</script>


<div {...avatar().getFallbackProps()}>
{@render children()}
</div>
        
          