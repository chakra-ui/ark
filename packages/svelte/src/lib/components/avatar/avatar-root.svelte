<script module lang="ts">
export interface AvatarRootProps extends UseAvatarProps {
  children: Snippet
}
</script>

<script lang="ts">
import type { Snippet } from "svelte"
import { setAvatarContext } from "./use-avatar-context"
import { useAvatar, type UseAvatarProps } from './use-avatar.svelte'
import { createSplitProps } from "../../utils/create-split-props"
import { mergeProps } from "@zag-js/svelte"

let props: AvatarRootProps = $props()
const [useAvatarProps, localProps] = createSplitProps<UseAvatarProps>()(props, [
    'id',
    'ids',
    'onStatusChange',
  ])
  const avatar =  useAvatar(useAvatarProps)

  const mergedProps = mergeProps(avatar().getRootProps(), localProps)

setAvatarContext(avatar)
</script>
  
<div {...mergedProps}>
  {@render props.children()}
</div>
