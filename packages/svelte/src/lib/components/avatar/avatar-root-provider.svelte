<script module lang="ts">
  import type { Assign, HTMLProps, RefAttribute } from '$lib/types'
  import type { UseAvatarReturn } from './use-avatar.svelte'

  interface RootProviderProps {
    value: UseAvatarReturn
  }

  export interface AvatarRootProviderBaseProps extends RootProviderProps, RefAttribute {}
  export interface AvatarRootProviderProps extends Assign<HTMLProps<'div'>, AvatarRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { AvatarProvider } from './use-avatar-context'

  let { ref = $bindable(null), value, ...props }: AvatarRootProviderProps = $props()
  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  AvatarProvider(() => value())
</script>

<Ark as="div" bind:ref {...mergedProps} />
