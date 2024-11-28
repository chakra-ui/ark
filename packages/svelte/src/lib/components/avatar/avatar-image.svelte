<script module lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'

  export interface AvatarImageBaseProps extends PolymorphicProps<'img'> {}
  export interface AvatarImageProps extends HTMLProps<'img'>, AvatarImageBaseProps {}
</script>

<script lang="ts">
  import { Ark } from '../factory'
  import { mergeProps } from '@zag-js/svelte'
  import { useAvatarContext } from './use-avatar-context'

  const props: AvatarImageProps = $props()
  const avatar = useAvatarContext()
  const mergedProps = $derived(mergeProps(avatar().getImageProps(), props))
</script>

<Ark as="img" {...mergedProps} />
