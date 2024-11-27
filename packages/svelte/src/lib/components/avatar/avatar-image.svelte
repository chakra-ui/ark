<script module lang="ts">
  import type { HTMLProps } from '$lib/types'

  export type AvatarImageBaseProps = {}
  export interface AvatarImageProps extends AvatarImageBaseProps, HTMLProps<'img'> {}
</script>

<script lang="ts">
  import { useAvatarContext } from './use-avatar-context'
  import { mergeProps } from '@zag-js/svelte'

  const props: AvatarImageProps = $props()
  const avatar = useAvatarContext()
  const mergedProps = $derived(mergeProps(avatar().getImageProps(), props))
</script>

<img {...mergedProps} />
