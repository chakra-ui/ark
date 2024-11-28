<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { UseAvatarProps } from './use-avatar.svelte'

  export interface AvatarRootBaseProps extends UseAvatarProps, PolymorphicProps<'div'> {}
  export interface AvatarRootProps extends Assign<HTMLProps<'div'>, AvatarRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props'
  import { AvatarProvider } from './use-avatar-context'
  import { useAvatar } from './use-avatar.svelte'
  import { Ark } from '../factory'

  let props: AvatarRootProps = $props()
  const [useAvatarProps, localProps] = createSplitProps<UseAvatarProps>()(props, [
    'id',
    'ids',
    'onStatusChange',
  ])

  const avatar = useAvatar(useAvatarProps)
  const mergedProps = $derived(mergeProps(avatar().getRootProps(), localProps))

  AvatarProvider(avatar)
</script>

<Ark as="div" {...mergedProps} />
