<script module lang="ts">
  import type { HTMLProps } from '$lib/types'

  export type AvatarFallbackBaseProps = {}
  export interface AvatarFallbackProps extends AvatarFallbackBaseProps, HTMLProps<'div'> {}
</script>

<script lang="ts">
  import { useAvatarContext } from './use-avatar-context'
  import { mergeProps } from '@zag-js/svelte'

  const props: AvatarFallbackProps = $props()

  const avatar = useAvatarContext()
  const mergedProps = $derived(mergeProps(avatar().getFallbackProps(), props))
</script>

<div {...mergedProps}>
  {@render props.children?.()}
</div>
