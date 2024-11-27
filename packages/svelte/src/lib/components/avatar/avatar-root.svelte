<script module lang="ts">
import type { Assign, HTMLProps } from '$lib/types'
import type { UseAvatarProps } from './use-avatar.svelte'

export interface AvatarRootBaseProps extends UseAvatarProps {}
export interface AvatarRootProps extends Assign<HTMLProps<'div'>, UseAvatarProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '../../utils/create-split-props'
  import { AvatarProvider } from './use-avatar-context'
  import { useAvatar } from './use-avatar.svelte'

  let props: AvatarRootProps = $props()
  const [useAvatarProps, localProps] = createSplitProps<UseAvatarProps>()(props, [
    'id',
    'ids',
    'onStatusChange',
  ])
  const avatar = useAvatar(useAvatarProps)
  // const mergedProps = mergeProps(() => avatar().getRootProps(), localProps)

  AvatarProvider(avatar)
</script>

<div {...avatar().getRootProps()} {...localProps}>
  {@render props.children?.()}
</div>
