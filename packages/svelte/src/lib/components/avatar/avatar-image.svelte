<script context="module" lang="ts">
import type { HTMLImgAttributes } from 'svelte/elements'
export interface AvatarImageProps extends HTMLImgAttributes {
  id?: string
}
</script>
    
<script lang="ts">
import { useAvatarContext } from "./use-avatar-context"

const { id, ...imageProps }: AvatarImageProps = $props()
const avatar = useAvatarContext()

</script>
      

<img {...avatar.api?.getImageProps()} {...imageProps} />
    
      