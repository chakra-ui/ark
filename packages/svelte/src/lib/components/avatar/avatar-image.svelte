<script module lang="ts">
  import type { HTMLProps } from '$lib/types'

  export type AvatarImageBaseProps = {}
  export interface AvatarImageProps extends AvatarImageBaseProps, HTMLProps<'img'> {}
</script>

<script lang="ts">
  import { useAvatarContext } from './use-avatar-context'

  const props: AvatarImageProps = $props()
  const avatar = useAvatarContext()
  // const mergedProps = mergeProps(() => avatar().getImageProps(), props)
</script>

<img {...avatar().getImageProps()} {...props} />
