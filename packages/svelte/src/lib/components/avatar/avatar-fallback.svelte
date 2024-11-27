<script module lang="ts">
export interface AvatarFallbackProps {
  children: Snippet
}
</script>
        
<script lang="ts">
import type { Snippet } from "svelte"
import { getAvatarContext } from "./use-avatar-context"

const { children }: AvatarFallbackProps = $props()
const avatar = getAvatarContext()
</script>


<div {...avatar().getFallbackProps()}>
{@render children()}
</div>
        
          