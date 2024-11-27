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
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { AvatarProvider } from './use-avatar-context'

  const props: AvatarRootProviderProps = $props()
  const [{ value: avatar }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])

  AvatarProvider(avatar)
</script>

<div {...avatar().getRootProps()} {...localProps}>
  {@render props.children?.()}
</div>
