<script module lang="ts">
  import type { Assign, HTMLProps, Optional, PolymorphicProps } from '$lib/types'
  import type { UseAvatarProps } from './use-avatar.svelte'

  export interface AvatarRootBaseProps extends Optional<UseAvatarProps, 'id'>, PolymorphicProps<'div'> {}
  export interface AvatarRootProps extends Assign<HTMLProps<'div'>, AvatarRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps, reflect } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props'
  import { Ark } from '../factory'
  import { AvatarProvider } from './use-avatar-context'
  import { useAvatar } from './use-avatar.svelte'

  const _props: AvatarRootProps = $props()
  const providedId = $props.id()

  const [useAvatarProps, localProps] = $derived(
    createSplitProps<Optional<UseAvatarProps, 'id'>>()(_props, ['id', 'ids', 'onStatusChange']),
  )

  const resolvedProps = $derived({
    ...useAvatarProps,
    id: providedId,
  })

  const avatar = useAvatar(reflect(() => resolvedProps))
  const mergedProps = $derived(mergeProps(avatar().getRootProps(), localProps))

  AvatarProvider(avatar)
</script>

<Ark as="div" {...mergedProps} />
