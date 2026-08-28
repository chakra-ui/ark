<script module lang="ts">
  import type { Assign, HTMLProps, Optional, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseAvatarProps } from './use-avatar.svelte.ts'

  export interface AvatarRootBaseProps extends Optional<UseAvatarProps, 'id'>, PolymorphicProps<'div'>, RefAttribute {}
  export interface AvatarRootProps extends Assign<HTMLProps<'div'>, AvatarRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props.ts'
  import { Ark } from '../factory/index.ts'
  import { AvatarProvider } from './use-avatar-context.ts'
  import { useAvatar } from './use-avatar.svelte.ts'

  let { ref = $bindable(null), ...props }: AvatarRootProps = $props()
  const providedId = $props.id()

  const [useAvatarProps, localProps] = $derived(
    createSplitProps<Optional<UseAvatarProps, 'id'>>()(props, ['id', 'ids', 'onStatusChange']),
  )

  const resolvedProps = $derived({
    ...useAvatarProps,
    id: providedId,
  })

  const avatar = useAvatar(() => resolvedProps)
  const mergedProps = $derived(mergeProps(avatar().getRootProps(), localProps))

  AvatarProvider(avatar)
</script>

<Ark as="div" bind:ref {...mergedProps} />
