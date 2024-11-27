<script module lang="ts">
import type { HTMLImgAttributes } from 'svelte/elements'
export interface AvatarImageProps extends HTMLImgAttributes {
  id?: string
}
</script>
    
<script lang="ts">
import { getAvatarContext } from "./use-avatar-context"

const { id, ...imageProps }: AvatarImageProps = $props()
const avatar = getAvatarContext()
</script>
  
<img {...avatar().getImageProps()} {...imageProps} />
    
      