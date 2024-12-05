<script module lang="ts">
  import type { Assign, HTMLProps } from '$lib/types'
  import type { UseAvatarReturn } from './use-avatar.svelte'

  interface RootProviderProps {
    value: UseAvatarReturn
  }

  export interface AvatarRootProviderBaseProps extends RootProviderProps {}
  export interface AvatarRootProviderProps
    extends Assign<HTMLProps<'div'>, AvatarRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { AvatarProvider } from './use-avatar-context'

  const props: AvatarRootProviderProps = $props()
  const { value: avatar, ...localProps } = props
  const mergedProps = $derived(mergeProps(avatar().getRootProps(), localProps))

  AvatarProvider(avatar)
</script>

<Ark as="div" {...mergedProps} />
