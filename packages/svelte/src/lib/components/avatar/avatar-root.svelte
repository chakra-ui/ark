<script context="module" lang="ts">
  export interface AvatarRootProps {
    id?: string
    children: Snippet
  }
</script>

<script lang="ts">
  import { type Snippet } from 'svelte'
  import { AvatarProvider } from './use-avatar-context'
  import { useAvatar } from './use-avatar.svelte'

  const { children, ...props }: AvatarRootProps = $props()
  
  const avatar = useAvatar(props)

  AvatarProvider(avatar)
  
</script>

<div {...avatar.api.getRootProps()}>
  {@render children()}
</div>
