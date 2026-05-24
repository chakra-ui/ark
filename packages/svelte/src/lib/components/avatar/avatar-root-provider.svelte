<script module lang="ts">
  import type { Assign, HTMLProps, RefAttribute } from '$lib/types'
  import type { UseAvatarReturn } from './use-avatar.svelte.ts'

  interface RootProviderProps {
    value: UseAvatarReturn
  }

  export interface AvatarRootProviderBaseProps extends RootProviderProps, RefAttribute {}
  export interface AvatarRootProviderProps extends Assign<HTMLProps<'div'>, AvatarRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { AvatarProvider } from './use-avatar-context.ts'

  let { ref = $bindable(null), value, ...props }: AvatarRootProviderProps = $props()
  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  AvatarProvider(() => value())
</script>

<Ark as="div" bind:ref {...mergedProps} />
