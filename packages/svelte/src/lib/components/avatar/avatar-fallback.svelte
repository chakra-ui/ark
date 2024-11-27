<script module lang="ts">
  import type { HTMLProps } from '$lib/types'

  export type AvatarFallbackBaseProps = {}
  export interface AvatarFallbackProps extends AvatarFallbackBaseProps, HTMLProps<'div'> {}
</script>

<script lang="ts">
  import { useAvatarContext } from './use-avatar-context'

  const props: AvatarFallbackProps = $props()
  const avatar = useAvatarContext()
  // const mergedProps = mergeProps(() => avatar().getFallbackProps(), props)
</script>

<div {...avatar().getFallbackProps()} {...props}>
  {@render props.children?.()}
</div>
