<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface ClipboardValueTextBaseProps extends PolymorphicProps<'span'> {}
  export interface ClipboardValueTextProps extends Assign<HTMLProps<'span'>, ClipboardValueTextBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '../factory'
  import { useClipboardContext } from './use-clipboard-context'

  const { children, ...props }: ClipboardValueTextProps = $props()

  const clipboard = useClipboardContext()
</script>

<Ark as="span" {...props}>
  {#if children}
    {@render children()}
  {:else}
    {clipboard().value}
  {/if}
</Ark>
